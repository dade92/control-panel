package webapp.ports

import domain.*
import domain.actions.AddThingAction
import domain.actions.ChangeHostAction
import domain.actions.RemoveThingsAction
import domain.actions.RetrieveDeviceAction
import domain.actions.request.AddThingRequest
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.*
import webapp.types.ThingUI

@RestController
class ThingsController(
    private val retrieveDeviceAction: RetrieveDeviceAction,
    private val removeThingsAction: RemoveThingsAction,
    private val addThingAction: AddThingAction,
    private val changeHostAction: ChangeHostAction
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

data class ThingsResponse(
    val things: List<ThingUI>
)