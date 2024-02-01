package domain.actions

import arrow.core.Either
import domain.Device
import domain.DeviceId
import domain.actions.errors.ActionError
import domain.repository.DeviceRepository

class RetrieveDeviceAction(
    private val deviceRepository: DeviceRepository
) {

    fun retrieveAll(): Either<ActionError, List<Device>> = deviceRepository.retrieveAll()

    fun retrieve(deviceId: DeviceId): Either<ActionError, Device> = deviceRepository.retrieve(deviceId)

}