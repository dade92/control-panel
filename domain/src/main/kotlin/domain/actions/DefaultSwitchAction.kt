package domain.actions

import arrow.core.Either
import arrow.core.flatMap
import arrow.core.left
import domain.DeviceId
import domain.Status
import domain.ThingId
import domain.actions.errors.ActionError
import domain.repository.DeviceRepository
import domain.repository.SwitchClient

interface SwitchAction {
    fun switch(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<ActionError, Unit>
}

class DefaultSwitchAction(
    private val switchClient: SwitchClient,
    private val deviceRepository: DeviceRepository
) : SwitchAction {
    override fun switch(
        deviceId: DeviceId,
        thingId: ThingId,
        newStatus: Status
    ): Either<ActionError.SwitchError, Unit> =
        deviceRepository.retrieve(deviceId).fold(
            {
                ActionError.SwitchError.DeviceNotAvailable.left()
            },
            { device ->
                val thing = device.things.first { it.id == thingId }
                switchClient.switch(device.host, thing.idOnDevice, newStatus).flatMap {
                    deviceRepository.updateThingStatus(deviceId, thingId, newStatus)
                }
            }
        )

}