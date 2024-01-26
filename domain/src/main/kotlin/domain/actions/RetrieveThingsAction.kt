package domain.actions

import arrow.core.Either
import domain.Device
import domain.repository.DeviceRepository
import domain.repository.RetrieveError

class RetrieveThingsAction(
    private val deviceRepository: DeviceRepository
) {

    fun retrieveAll(): Either<RetrieveError, List<Device>> = deviceRepository.retrieveAll()

}