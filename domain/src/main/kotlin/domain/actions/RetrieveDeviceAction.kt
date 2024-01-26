package domain.actions

import arrow.core.Either
import domain.Device
import domain.DeviceId
import domain.repository.DeviceRepository
import domain.repository.RetrieveError

class RetrieveDeviceAction(
    private val deviceRepository: DeviceRepository
) {

    fun retrieveAll(): Either<RetrieveError, List<Device>> = deviceRepository.retrieveAll()

    fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device> = deviceRepository.retrieve(deviceId)

}