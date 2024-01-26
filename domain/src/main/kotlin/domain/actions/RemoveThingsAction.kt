package domain.actions

import arrow.core.Either
import domain.DeviceId
import domain.ThingId
import domain.repository.RetrieveError

class RemoveThingsAction {
    fun remove(deviceId: DeviceId, thingId: ThingId): Either<RetrieveError, Unit> {
        TODO()
    }
}