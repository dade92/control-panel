package webapp.ports

import arrow.core.right
import domain.*
import domain.actions.SwitchAction
import domain.repository.DeviceRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import java.util.*

@RestController
class ThingsController(
    private val switchAction: SwitchAction,
    private val deviceRepository: DeviceRepository,
    private val deviceToThingResponseAdapter: DeviceToThingResponseAdapter
) : BaseApiController() {

    @GetMapping("/v1/things")
    fun retrieveThings(): ResponseEntity<*> =
        deviceRepository.retrieveAll().fold(
            {
                ResponseEntity.internalServerError().build()
            },
            {
                ResponseEntity.ok(
                    ThingsResponse(
                        thingResponses = deviceToThingResponseAdapter.adapt(it)
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
    val thingResponses: List<ThingResponse>
)

data class ThingResponse(
    val id: ThingId,
    val name: ThingName,
    val device: DeviceName,
    val deviceId: DeviceId,
    val type: ThingType,
    val management: ThingManagement
)

