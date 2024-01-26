package webapp.ports

import domain.*
import domain.actions.RetrieveDeviceAction
import domain.actions.SwitchAction
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
class ThingsController(
    private val switchAction: SwitchAction,
    private val retrieveDeviceAction: RetrieveDeviceAction,
) : BaseApiController() {

    private val deviceToThingResponseAdapter = DeviceToThingResponseAdapter()

    @GetMapping("/v1/things")
    fun retrieveThings(): ResponseEntity<*> =
        retrieveDeviceAction.retrieveAll().fold(
            {
                ResponseEntity.internalServerError().build()
            },
            {
                ResponseEntity.ok(
                    ThingsResponse(
                        things = deviceToThingResponseAdapter.adapt(it)
                    )
                )
            }
        )

    @PostMapping("/v1/switch/{deviceId}/{thingId}")
    fun switch(
        @PathVariable deviceId: DeviceId,
        @PathVariable thingId: ThingId,
        @RequestBody request: SwitchRequest
    ): ResponseEntity<*> =
        switchAction.switch(deviceId, thingId, request.switch).fold(
            {
                ResponseEntity.internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                ResponseEntity.noContent().build()
            }
        )

    @PostMapping("/v1/things/remove/{thingId}")
    fun removeThing(
        @PathVariable thingId: String,
    ): ResponseEntity<Unit> {
        Thread.sleep(1000)
        return ResponseEntity.noContent().build()
    }
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

