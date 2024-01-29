package domain.actions

import arrow.core.Either
import arrow.core.right
import domain.DeviceId
import domain.Thing
import domain.actions.request.AddThingRequest
import domain.repository.DeviceRepository

class AddThingAction(private val deviceRepository: DeviceRepository) {

    fun add(deviceId: DeviceId, addThingRequest: AddThingRequest): Either<AddThingError, Unit> {

        return Unit.right()
    }
}

sealed class AddThingError {

}