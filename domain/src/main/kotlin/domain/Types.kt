package domain

import java.util.*

data class Thing(
    val id: ThingId,
    val name: ThingName,
    val type: ThingType,
    val management: ThingManagement,
    val idOnDevice: Int
)

data class Device(
    val deviceId: DeviceId,
    val deviceName: DeviceName,
    val host: DeviceHost,
    val things: List<Thing>
)

@JvmInline
value class DeviceName(val value: String)

@JvmInline
value class DeviceHost(val value: String)

@JvmInline
value class ThingName(val value: String)

@JvmInline
value class ThingId(val value: UUID)

@JvmInline
value class DeviceId(val value: UUID)


fun String.asThingName() = ThingName(this)
fun String.asDeviceName() = ThingName(this)

fun UUID.asThingId() = ThingId(this)
fun UUID.asDeviceId() = DeviceId(this)

data class ThingManagement(
    val switch: Status
)

enum class Status {
    ON, OFF
}

enum class ThingType {
    LAMP, ALARM
}
