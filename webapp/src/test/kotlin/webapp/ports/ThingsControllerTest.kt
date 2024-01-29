package webapp.ports

import arrow.core.left
import arrow.core.right
import com.springexample.utils.Fixtures
import domain.ThingType
import domain.actions.AddThingAction
import domain.actions.RemoveThingsAction
import domain.actions.RetrieveDeviceAction
import domain.actions.request.AddThingRequest
import domain.asThingName
import domain.repository.RetrieveError
import domain.utils.aDevice
import domain.utils.aDeviceHost
import domain.utils.aDeviceId
import domain.utils.aDeviceName
import domain.utils.aThing
import domain.utils.aThingId
import domain.utils.aThingName
import domain.utils.anotherDeviceHost
import domain.utils.anotherDeviceId
import domain.utils.anotherDeviceName
import domain.utils.anotherThingId
import domain.utils.anotherThingName
import org.junit.jupiter.api.Test
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

@WebMvcTest(ThingsController::class)
class ThingsControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var retrieveDeviceAction: RetrieveDeviceAction

    @MockBean
    private lateinit var removeThingsAction: RemoveThingsAction

    @MockBean
    private lateinit var addThingAction: AddThingAction

    @Test
    fun `retrieve things`() {
        `when`(retrieveDeviceAction.retrieveAll()).thenReturn(
            listOf(aDevice(
                deviceId = aDeviceId,
                deviceName = aDeviceName,
                deviceHost = aDeviceHost,
                things = listOf(
                    aThing(
                        thingId = aThingId,
                        thingName = aThingName,
                        thingType = ThingType.LAMP
                    ),
                    aThing(
                        thingId = anotherThingId,
                        thingName = anotherThingName,
                        thingType = ThingType.ALARM
                    )
                )
            ),
                aDevice(
                    deviceId = anotherDeviceId,
                    deviceName = anotherDeviceName,
                    deviceHost = anotherDeviceHost,
                    things = listOf(
                        aThing(
                            thingId = anotherThingId,
                            thingName = anotherThingName
                        )
                    )
                )).right()
        )

        mvc.perform(
            get("/api/v1/things").contentType(MediaType.APPLICATION_JSON)
        ).andExpect(status().isOk())
            .andExpect(content().json(Fixtures.readJson("/thingsResponse.json")))
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

    @Test
    fun `add thing on a device`() {
        `when`(addThingAction.add(
            aDeviceId,
            AddThingRequest(
                "new name".asThingName(),
                ThingType.LAMP
            ))
        ).thenReturn(Unit.right())

        mvc.perform(
            post("/api/v1/things/add/${aDeviceId}")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Fixtures.readJson("/addThingRequest.json"))
        ).andExpect(status().isNoContent())
    }
}
