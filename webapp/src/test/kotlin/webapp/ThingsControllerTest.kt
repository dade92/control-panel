package webapp

import arrow.core.left
import arrow.core.right
import com.springexample.utils.Fixtures
import domain.Status
import domain.actions.DefaultSwitchAction
import domain.actions.RemoveThingsAction
import domain.actions.RetrieveDeviceAction
import domain.actions.SwitchError.DeviceNotAvailable
import domain.repository.RetrieveError
import domain.utils.aDevice
import domain.utils.aDeviceId
import domain.utils.aThingId
import org.junit.jupiter.api.Test
import org.mockito.Mockito.verify
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import webapp.ports.ThingsController

@WebMvcTest(ThingsController::class)
class ThingsControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var switchAction: DefaultSwitchAction

    @MockBean
    private lateinit var retrieveDeviceAction: RetrieveDeviceAction

    @MockBean
    private lateinit var removeThingsAction: RemoveThingsAction

    @Test
    fun `retrieve things`() {
        //TODO customize the response of the action
        `when`(retrieveDeviceAction.retrieveAll()).thenReturn(
            listOf(aDevice(), aDevice()).right()
        )

        mvc.perform(
            get("/api/v1/things").contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk())
            .andExpect(content().json(Fixtures.readJson("/thingsResponse.json")))
    }

    @Test
    fun `switch lamp ON successfully`() {
        `when`(switchAction.switch(aDeviceId, aThingId, Status.ON)).thenReturn(
            Unit.right()
        )

        mvc.perform(
            post("/api/v1/switch/${aDeviceId}/${aThingId}")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"switch":  "ON"}""")
        ).andExpect(status().isNoContent)

        verify(switchAction).switch(aDeviceId, aThingId, Status.ON)
    }

    @Test
    fun `in case of error, returns 500 with the specific problem`() {
        `when`(switchAction.switch(aDeviceId, aThingId, Status.ON)).thenReturn(
            DeviceNotAvailable.left()
        )

        mvc.perform(
            post("/api/v1/switch/${aDeviceId}/${aThingId}")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""{"switch":  "ON"}""")
        ).andExpect(status().is5xxServerError).andExpect(content().json("""{"error": "DeviceNotAvailable"}"""))

        verify(switchAction).switch(aDeviceId, aThingId, Status.ON)
    }

    @Test
    fun `remove thing happy path`() {
        `when`(removeThingsAction.remove(aDeviceId, aThingId)).thenReturn(
            Unit.right()
        )

        mvc.perform(
            post("/api/v1/things/remove/${aDeviceId}/${aThingId}")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isNoContent())
    }

    @Test
    fun `remove thing failure`() {
        `when`(removeThingsAction.remove(aDeviceId, aThingId)).thenReturn(
            RetrieveError.DeviceRetrieveError.left()
        )

        mvc.perform(
            post("/api/v1/things/remove/${aDeviceId}/${aThingId}")
                .contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().is5xxServerError)
            .andExpect(content().json("""{"error": "DeviceRetrieveError"}"""))
    }
}
