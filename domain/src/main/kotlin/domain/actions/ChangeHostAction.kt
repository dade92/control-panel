package domain.actions

import arrow.core.Either
import arrow.core.right
import domain.DeviceHost
import domain.DeviceId
import domain.actions.errors.ActionError
import domain.repository.DeviceRepository

class ChangeHostAction(private val deviceRepository: DeviceRepository) {

    fun changeHost(deviceId: DeviceId, deviceHost: DeviceHost): Either<ActionError, Unit> {
        return Unit.right()
    }

}