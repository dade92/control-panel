package domain.actions

import arrow.core.Either
import arrow.core.right
import domain.*
import domain.actions.errors.ActionError
import domain.repository.DeviceRepository

class SwitchOffAction(private val deviceRepository: DeviceRepository) {

    fun switchOff(things: List<ThingToDevice>): Either<ActionError, Unit> =
        TODO()

}