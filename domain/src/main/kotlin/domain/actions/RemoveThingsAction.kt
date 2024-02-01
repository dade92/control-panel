package domain.actions

import arrow.core.Either
import domain.DeviceId
import domain.ThingId
import domain.actions.errors.ActionError
import domain.repository.DeviceRepository

class RemoveThingsAction(
    private val deviceRepository: DeviceRepository
) {
    fun remove(deviceId: DeviceId, thingId: ThingId): Either<ActionError, Unit> =
        deviceRepository.removeThing(deviceId, thingId)
}