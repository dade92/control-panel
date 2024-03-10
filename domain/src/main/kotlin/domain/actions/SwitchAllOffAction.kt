package domain.actions

import arrow.core.Either
import arrow.core.flatMap
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
        things.forEach { thingToDevice ->
            switchClient.switch(
                thingToDevice.deviceHost,
                1.asIdOnDevice(),
                Status.OFF
            ).flatMap {
                deviceRepository.updateThingStatus(
                    thingToDevice.deviceId,
                    thingToDevice.id,
                    Status.OFF
                )
            }
        }
        return Unit.right()
    }
}