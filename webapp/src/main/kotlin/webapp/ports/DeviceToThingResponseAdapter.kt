package webapp.ports

import domain.Device

class DeviceToThingResponseAdapter {

    fun adapt(devices: List<Device>): List<ThingResponse> =
        devices.flatMap {
            adaptDevice(it)
        }

    private fun adaptDevice(device: Device): List<ThingResponse> =
        device.things.map {
            ThingResponse(
                it.id,
                it.name,
                device.deviceName,
                device.deviceId,
                device.host,
                it.type,
                it.management
            )
        }

}