package domain.actions

import arrow.core.Either
import domain.DeviceId
import domain.ThingId
import domain.repository.DeviceRepository
import domain.repository.RetrieveError

class RemoveThingsAction(
    private val deviceRepository: DeviceRepository
) {
    fun remove(deviceId: DeviceId, thingId: ThingId): Either<RetrieveError, Unit> =
        deviceRepository.removeThing(deviceId, thingId)
}