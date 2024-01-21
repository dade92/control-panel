package webapp

import domain.thing.Status
import domain.thing.Thing
import domain.thing.ThingManagement
import domain.thing.ThingType
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class ThingsController : BaseApiController() {

    @GetMapping("/v1/things")
    fun retrieveThings(): ResponseEntity<*> =
        ResponseEntity.ok(
            ThingsResponse(
                listOf(
                    Thing(
                        id = "123",
                        device = "arduino uno",
                        deviceId = "XYZ",
                        type = ThingType.LAMP,
                        management = ThingManagement(
                            switch = Status.ON
                        )
                    )
                )
            )
        )
}

data class ThingsResponse(
    val things: List<Thing>
)

