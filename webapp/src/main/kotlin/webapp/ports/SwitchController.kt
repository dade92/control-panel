package webapp.ports

import domain.DeviceId
import domain.ThingId
import domain.actions.SwitchAction
import domain.actions.SwitchAllOffAction
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import webapp.types.ThingUI

@RestController
class SwitchController(
    private val switchAction: SwitchAction,
    private val switchAllOffAction: SwitchAllOffAction
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

    @PostMapping("/v1/switch/switchAll")
    fun switchAllOff(
        @RequestBody switchOffRequest: SwitchOffRequest
    ): ResponseEntity<*> =
        switchAllOffAction.switchOff(switchOffRequest.things.map { it.toThingToDevice() }).fold(
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
