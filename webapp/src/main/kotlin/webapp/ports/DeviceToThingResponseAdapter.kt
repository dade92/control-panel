package webapp.ports

import domain.Device

class DeviceToThingResponseAdapter {

    fun adapt(devices: List<Device>): List<ThingUI> =
        devices.flatMap {
            adaptDevice(it)
        }

    private fun adaptDevice(device: Device): List<ThingUI> =
        device.things.map {
            ThingUI(
                it.id,
                it.name,
                device.deviceName,
                device.deviceId,
                device.host,
                it.type,
                it.management,
            )
        }

}