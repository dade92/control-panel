package webapp.types

import domain.DeviceHost
import domain.DeviceId
import domain.DeviceName
import domain.ThingId
import domain.ThingManagement
import domain.ThingName
import domain.ThingToDevice
import domain.ThingType

data class ThingUI(
    val id: ThingId,
    val name: ThingName,
    val device: DeviceName,
    val deviceId: DeviceId,
    val deviceHost: DeviceHost,
    val type: ThingType,
    val management: ThingManagement
) {
    fun toThingToDevice() = ThingToDevice(id, name, type, management, deviceId, device, deviceHost)
}