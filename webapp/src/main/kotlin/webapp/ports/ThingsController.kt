package webapp.ports

import domain.*
import domain.actions.AddThingAction
import domain.actions.RemoveThingsAction
import domain.actions.RetrieveDeviceAction
import domain.actions.SwitchAction
import domain.actions.request.AddThingRequest
import org.springframework.http.ResponseEntity
import org.springframework.http.ResponseEntity.*
import org.springframework.web.bind.annotation.*

@RestController
class ThingsController(
    private val retrieveDeviceAction: RetrieveDeviceAction,
    private val removeThingsAction: RemoveThingsAction,
    private val addThingAction: AddThingAction
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

    @PostMapping("/v1/things/add/{deviceId}")
    fun addThing(
        @PathVariable deviceId: DeviceId,
        @RequestBody addThingRequest: AddThingRequest
    ): ResponseEntity<*> =
        addThingAction.add(deviceId, addThingRequest).fold(
            {
                internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                noContent().build()
            }
        )
}

data class ErrorResponse(val error: String)

data class SwitchRequest(
    val switch: Status
)

data class ThingsResponse(
    val things: List<ThingResponse>
)

data class ThingResponse(
    val id: ThingId,
    val name: ThingName,
    val device: DeviceName,
    val deviceId: DeviceId,
    val type: ThingType,
    val management: ThingManagement
)

