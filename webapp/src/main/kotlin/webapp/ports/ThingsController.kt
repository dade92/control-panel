package webapp.ports

import domain.actions.SwitchAction
import domain.thing.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class ThingsController(
    private val switchAction: SwitchAction
) : BaseApiController() {

    @GetMapping("/v1/things")
    fun retrieveThings(): ResponseEntity<*> =
        ResponseEntity.ok(
            ThingsResponse(
                listOf(
                    ThingResponse(
                        id = UUID.fromString("cf318036-99ec-4875-9f5d-212d27ffb315"),
                        name = "Luce soggiorno".asThingName(),
                        device = "arduino uno",
                        deviceId = "XYZ",
                        type = ThingType.LAMP,
                        management = ThingManagement(
                            switch = Status.OFF
                        )
                    )
                )
            )
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
    val thingResponses: List<ThingResponse>
)

data class ThingResponse(
    val id: UUID,
    val name: ThingName,
    val device: String,
    val deviceId: String,
    val type: ThingType,
    val management: ThingManagement
)

