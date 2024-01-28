package webapp.ports

import arrow.core.left
import arrow.core.right
import domain.Status
import domain.actions.DefaultSwitchAction
import domain.actions.SwitchError
import domain.utils.aDeviceId
import domain.utils.aThingId
import org.junit.jupiter.api.Test
import org.mockito.Mockito
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders
import org.springframework.test.web.servlet.result.MockMvcResultMatchers

@WebMvcTest(SwitchController::class)
class SwitchControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var switchAction: DefaultSwitchAction

    @Test
    fun `switch lamp ON successfully`() {
        Mockito.`when`(switchAction.switch(aDeviceId, aThingId, Status.ON)).thenReturn(
            Unit.right()
        )

        mvc.perform(
            MockMvcRequestBuilders.post("/api/v1/switch/$aDeviceId/$aThingId")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"switch":  "ON"}""")
        ).andExpect(MockMvcResultMatchers.status().isNoContent)

        Mockito.verify(switchAction).switch(aDeviceId, aThingId, Status.ON)
    }

    @Test
    fun `in case of error, returns 500 with the specific problem`() {
        Mockito.`when`(switchAction.switch(aDeviceId, aThingId, Status.ON)).thenReturn(
            SwitchError.DeviceNotAvailable.left()
        )

        mvc.perform(
            MockMvcRequestBuilders.post("/api/v1/switch/$aDeviceId/$aThingId")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"switch":  "ON"}""")
        ).andExpect(MockMvcResultMatchers.status().is5xxServerError)
            .andExpect(MockMvcResultMatchers.content().json("""{"error": "DeviceNotAvailable"}"""))

        Mockito.verify(switchAction).switch(aDeviceId, aThingId, Status.ON)
    }

}