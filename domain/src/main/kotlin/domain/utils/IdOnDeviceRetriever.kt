package domain.utils

import domain.Device
import domain.IdOnDevice
import domain.asIdOnDevice

class IdOnDeviceRetriever {

    fun get(device: Device): IdOnDevice = (device.things.map { it.idOnDevice.value }.maxOf { it } + 1).asIdOnDevice()

}