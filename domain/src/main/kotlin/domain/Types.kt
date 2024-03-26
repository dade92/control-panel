package domain

import java.util.UUID

data class Thing(
    val id: ThingId,
    val name: ThingName,
    val type: ThingType,
    val management: ThingManagement,
    val idOnDevice: IdOnDevice
)

data class Device(
    val deviceId: DeviceId,
    val deviceName: DeviceName,
    val host: DeviceHost,
    val things: List<Thing>
) {

    operator fun get(thingId: ThingId): Thing? = things.firstOrNull { it.id == thingId }

    operator fun get(idOnDevice: IdOnDevice): Thing? = things.firstOrNull { it.idOnDevice == idOnDevice }

    fun hasThingsConnected(): Boolean = things.isNotEmpty()

}

data class ThingToDevice(
    val id: ThingId,
    val name: ThingName,
    val type: ThingType,
    val management: ThingManagement,
    val deviceId: DeviceId,
    val device: DeviceName,
    val deviceHost: DeviceHost
)

@JvmInline
value class DeviceName(val value: String) {
    override fun toString(): String = value
}

@JvmInline
value class DeviceHost(val value: String) {
    override fun toString(): String = value
}

@JvmInline
value class IdOnDevice(val value: Int) {
    override fun toString(): String = value.toString()
}

@JvmInline
value class ThingName(val value: String) {
    override fun toString(): String = value
}

@JvmInline
value class ThingId(val value: UUID) {
    override fun toString(): String = value.toString()
}

//TODO override the value to have a string when reading it?
@JvmInline
value class DeviceId(val value: UUID) {
    override fun toString(): String = value.toString()
}

data class ThingManagement(
    val switch: Status
)

enum class Status {
    ON, OFF
}

enum class ThingType {
    LAMP, ALARM, ROLLER_SHUTTER, APPLIANCE
}

fun String.asThingName() = ThingName(this)
fun String.asDeviceName() = DeviceName(this)
fun String.asDeviceHost() = DeviceHost(this)
fun String.asThingId() = ThingId(UUID.fromString(this))
fun String.asDeviceId() = DeviceId(UUID.fromString(this))
fun Int.asIdOnDevice() = IdOnDevice(this)