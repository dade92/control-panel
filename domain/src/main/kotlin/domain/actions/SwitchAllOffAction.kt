package domain.actions

import arrow.core.Either
import arrow.core.flatMap
import arrow.core.left
import arrow.core.right
import domain.Status
import domain.ThingToDevice
import domain.actions.errors.ActionError
import domain.asIdOnDevice
import domain.client.SwitchClient
import domain.repository.DeviceRepository

class SwitchAllOffAction(
    private val deviceRepository: DeviceRepository,
    private val switchClient: SwitchClient
) {

    fun switchOff(things: List<ThingToDevice>): Either<ActionError, Unit> {
        val outcomes = ArrayList<Either<ActionError.SwitchError, Unit>>()
        things.forEach { thingToDevice ->
            val outcome = switchClient.switch(
                thingToDevice.deviceHost,
                1.asIdOnDevice(),   //TODO: This is a hardcoded value, can we maintain it?
                Status.OFF
            ).flatMap {
                deviceRepository.updateThingStatus(
                    thingToDevice.deviceId,
                    thingToDevice.id,
                    Status.OFF
                )
            }
            outcomes.add(outcome)
        }
        return if (outcomes.any { it.isLeft() }) {
            ActionError.SwitchError.SomethingWrongWithSwitchAll.left()
        } else {
            Unit.right()
        }
    }
}