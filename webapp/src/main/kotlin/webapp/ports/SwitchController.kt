package webapp.ports

import domain.DeviceId
import domain.ThingId
import domain.ThingToDevice
import domain.actions.SwitchAction
import domain.actions.SwitchOffAction
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class SwitchController(
    private val switchAction: SwitchAction,
    private val switchOffAction: SwitchOffAction
) : BaseApiController() {

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

    @PostMapping("/v1/things/switchOff")
    fun switchOff(
        @RequestBody switchOffRequest: SwitchOffRequest
    ): ResponseEntity<*> =
        switchOffAction.switchOff(switchOffRequest.things.map { it.toThingToDevice() }).fold(
            {
                ResponseEntity.internalServerError().body(ErrorResponse(it.javaClass.simpleName))
            },
            {
                ResponseEntity.noContent().build()
            }
        )

}

data class SwitchOffRequest(
    val things: List<ThingUI>
)
