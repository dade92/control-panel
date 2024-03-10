package webapp.ports

import arrow.core.left
import arrow.core.right
import com.springexample.utils.Fixtures
import domain.Status
import domain.actions.SwitchAction
import domain.actions.SwitchOffAction
import domain.actions.errors.ActionError.SwitchError
import domain.utils.aDeviceId
import domain.utils.aThingId
import domain.utils.aThingToDevice
import org.junit.jupiter.api.Test
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(SwitchController::class)
class SwitchControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var switchAction: SwitchAction

    @MockBean
    private lateinit var switchOffAction: SwitchOffAction

    @Test
    fun `switch lamp ON successfully`() {
        `when`(switchAction.switch(aDeviceId, aThingId, Status.ON)).thenReturn(
            Unit.right()
        )

        mvc.perform(
            post("/api/v1/switch/$aDeviceId/$aThingId")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"switch":  "ON"}""")
        ).andExpect(status().isNoContent)

        verify(switchAction).switch(aDeviceId, aThingId, Status.ON)
    }

    @Test
    fun `in case of error, returns 500 with the specific problem`() {
        `when`(switchAction.switch(aDeviceId, aThingId, Status.ON)).thenReturn(
            SwitchError.DeviceNotAvailable.left()
        )

        mvc.perform(
            post("/api/v1/switch/$aDeviceId/$aThingId")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"switch":  "ON"}""")
        ).andExpect(status().is5xxServerError)
            .andExpect(content().json("""{"error": "DeviceNotAvailable"}"""))

        verify(switchAction).switch(aDeviceId, aThingId, Status.ON)
    }

    @Test
    fun `switch all things off`() {
        `when`(switchOffAction.switchOff(listOf(aThingToDevice()))).thenReturn(Unit.right())

        mvc.perform(
            post("/api/v1/things/switchOff")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Fixtures.readJson("/switchOffRequest.json"))
        ).andExpect(status().is2xxSuccessful())
    }
}