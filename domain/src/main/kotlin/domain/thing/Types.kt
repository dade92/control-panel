package domain.thing

import java.util.*

data class Thing(
    val id: UUID,
    val device: String,
    val deviceId: String,
    val type: ThingType,
    val management: ThingManagement
)

data class ThingManagement(
    val switch: Status
)

enum class Status {
    ON, OFF
}

enum class ThingType {
    LAMP, ALARM
}
