package domain.actions

import arrow.core.Either
import arrow.core.flatMap
import arrow.core.left
import domain.DeviceId
import domain.Status
import domain.ThingId
import domain.actions.errors.ActionError
import domain.actions.errors.ActionError.SwitchError.ThingNotFound
import domain.repository.DeviceRepository
import domain.client.SwitchClient

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
    ): Either<ActionError, Unit> =
        deviceRepository.retrieve(deviceId).flatMap { device ->
            device.things.firstOrNull { it.id == thingId }?.let {
                switchClient.switch(device.host, it.idOnDevice, newStatus).flatMap {
                    deviceRepository.updateThingStatus(deviceId, thingId, newStatus)
                }
            } ?: ThingNotFound.left()
        }

}