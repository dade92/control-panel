package webapp.ports

import domain.actions.SwitchAction
import domain.thing.Status
import domain.thing.Thing
import domain.thing.ThingManagement
import domain.thing.ThingType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
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
                    Thing(
                        id = UUID.fromString("cf318036-99ec-4875-9f5d-212d27ffb315"),
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

    @PostMapping("/v1/switch/{deviceId}/{switchId}")
    fun switch(
        @PathVariable deviceId: String,
        @PathVariable switchId: String,
        @RequestBody request: SwitchRequest
    ): ResponseEntity<Unit> {
        switchAction.switch(request.switch)
        return ResponseEntity.noContent().build()
    }
}

data class SwitchRequest(
    val switch: Status
)

data class ThingsResponse(
    val things: List<Thing>
)

