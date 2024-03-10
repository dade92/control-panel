package webapp.ports

import arrow.core.left
import arrow.core.right
import com.springexample.utils.Fixtures
import domain.ThingType
import domain.actions.*
import domain.actions.errors.ActionError.RetrieveError
import domain.actions.request.AddThingRequest
import domain.asThingName
import domain.utils.*
import org.junit.jupiter.api.Test
import org.mockito.Mockito.`when`
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*
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

    @MockBean
    private lateinit var changeHostAction: ChangeHostAction

    @MockBean
    private lateinit var switchOffAction: SwitchOffAction

    @Test
    fun `retrieve things`() {
        `when`(retrieveDeviceAction.retrieveAll()).thenReturn(
            listOf(
                aDevice(
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
                )
            ).right()
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
        `when`(
            addThingAction.add(
                AddThingRequest(
                    aDeviceId,
                    "new name".asThingName(),
                    ThingType.LAMP
                )
            )
        ).thenReturn(aThingToDevice().right())

        mvc.perform(
            post("/api/v1/things/add")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Fixtures.readJson("/addThingRequest.json"))
        ).andExpect(status().is2xxSuccessful())
            .andExpect(content().json(Fixtures.readJson("/addThingResponse.json")))
    }

    @Test
    fun `change device host`() {
        `when`(
            changeHostAction.changeHost(
                aDeviceId,
                anotherDeviceHost
            )
        ).thenReturn(Unit.right())

        mvc.perform(
            put("/api/v1/things/changeHost/$aDeviceId")
                .contentType(MediaType.APPLICATION_JSON)
                .content(Fixtures.readJson("/changeHostRequest.json"))
        ).andExpect(status().is2xxSuccessful())
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
