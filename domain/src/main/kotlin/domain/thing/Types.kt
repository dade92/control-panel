package domain.thing

import java.util.*

data class Thing(
    val id: UUID,
    val name: ThingName,
    val device: String,
    val deviceId: String,
    val type: ThingType,
    val management: ThingManagement
)

@JvmInline
value class ThingName(val value: String)

fun String.asThingName() = ThingName(this)

data class ThingManagement(
    val switch: Status
)

enum class Status {
    ON, OFF
}

enum class ThingType {
    LAMP, ALARM
}
