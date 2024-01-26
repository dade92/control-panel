package webapp.ports

import domain.DeviceId
import domain.DeviceName
import domain.Status
import domain.ThingId
import domain.ThingManagement
import domain.ThingName
import domain.ThingType
import domain.actions.RetrieveThingsAction
import domain.actions.SwitchAction
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class ThingsController(
    private val switchAction: SwitchAction,
    private val retrieveThingsAction: RetrieveThingsAction,
) : BaseApiController() {

    private val deviceToThingResponseAdapter = DeviceToThingResponseAdapter()

    @GetMapping("/v1/things")
    fun retrieveThings(): ResponseEntity<*> =
        retrieveThingsAction.retrieveAll().fold(
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
        @PathVariable deviceId: String,
        @PathVariable thingId: String,
        @RequestBody request: SwitchRequest
    ): ResponseEntity<Unit> {
        switchAction.switch(request.switch)
        return ResponseEntity.noContent().build()
    }

    @PostMapping("/v1/things/remove/{thingId}")
    fun removeThing(
        @PathVariable thingId: String,
    ): ResponseEntity<Unit> {
        Thread.sleep(1000)
        return ResponseEntity.noContent().build()
    }
}

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

