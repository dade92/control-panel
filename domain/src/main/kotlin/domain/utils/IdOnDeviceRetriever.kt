package domain.utils

import domain.Device
import domain.IdOnDevice
import domain.asIdOnDevice

class IdOnDeviceRetriever {
    fun get(device: Device): IdOnDevice =
        device.things.map { it.idOnDevice.value }.let {
            if (it.isEmpty()) {
                1.asIdOnDevice()
            } else {
                (it.maxOf { it } + 1).asIdOnDevice()
            }
        }

}