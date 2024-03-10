package webapp.ports

import domain.*
import domain.actions.*
import domain.actions.request.AddThingRequest
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.*

@RestController
class ThingsController(
    private val retrieveDeviceAction: RetrieveDeviceAction,
    private val removeThingsAction: RemoveThingsAction,
    private val addThingAction: AddThingAction,
    private val changeHostAction: ChangeHostAction,
    private val switchOffAction: SwitchOffAction
) : BaseApiController() {

    private val deviceToThingResponseAdapter = DeviceToThingResponseAdapter()

    @GetMapping("/v1/things")
    fun retrieveThings(): ResponseEntity<*> =
        retrieveDeviceAction.retrieveAll().fold(
            {
                internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                ok(
                    ThingsResponse(
                        things = deviceToThingResponseAdapter.adapt(it)
                    )
                )
            }
        )

    @PostMapping("/v1/things/remove/{deviceId}/{thingId}")
    fun removeThing(
        @PathVariable thingId: ThingId,
        @PathVariable deviceId: DeviceId
    ): ResponseEntity<*> =
        removeThingsAction.remove(deviceId, thingId).fold(
            {
                internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                noContent().build()
            }
        )

    @PostMapping("/v1/things/add")
    fun addThing(
        @RequestBody addThingRequest: AddThingRequest
    ): ResponseEntity<*> =
        addThingAction.add(addThingRequest).fold(
            {
                internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                ok(AddThingResponse(it))
            }
        )

    @PutMapping("/v1/things/changeHost/{deviceId}")
    fun changeDeviceHost(
        @PathVariable deviceId: DeviceId,
        @RequestBody changeHostRequest: ChangeHostRequest
    ): ResponseEntity<*> =
        changeHostAction.changeHost(deviceId, changeHostRequest.newHost.asDeviceHost()).fold(
            {
                internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                noContent().build()
            }
        )

    @PostMapping("/v1/things/switchOff")
    fun switchOff(
        @RequestBody switchOffRequest: SwitchOffRequest
    ): ResponseEntity<*> =
        switchOffAction.switchOff(switchOffRequest.things.map {
            ThingToDevice(it.id, it.name, it.type, it.management, it.deviceId, it.device)
        }).fold(
            {
                internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                noContent().build()
            }
        )
}

data class ChangeHostRequest(
    val newHost: String
)

data class AddThingResponse(
    val thing: ThingToDevice
)

data class ErrorResponse(val error: String)

data class SwitchRequest(
    val switch: Status
)

data class SwitchOffRequest(
    val things: List<ThingUI>
)

data class ThingsResponse(
    val things: List<ThingUI>
)

data class ThingUI(
    val id: ThingId,
    val name: ThingName,
    val device: DeviceName,
    val deviceId: DeviceId,
    val deviceHost: DeviceHost,
    val type: ThingType,
    val management: ThingManagement
)

