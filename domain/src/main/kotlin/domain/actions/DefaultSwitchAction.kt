package domain.actions

import arrow.core.Either
import arrow.core.flatMap
import arrow.core.left
import domain.DeviceId
import domain.Status
import domain.ThingId
import domain.repository.DeviceRepository
import domain.repository.SwitchClient

interface SwitchAction {
    fun switch(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit>
}

class DefaultSwitchAction(
    private val switchClient: SwitchClient,
    private val deviceRepository: DeviceRepository
) : SwitchAction {
    override fun switch(
        deviceId: DeviceId,
        thingId: ThingId,
        newStatus: Status
    ): Either<SwitchError, Unit> =
        deviceRepository.retrieve(deviceId).fold(
            {
                SwitchError.DeviceNotAvailable.left()
            },
            { device ->
                val thing = device.things.first { it.id == thingId }
                switchClient.switch(device.host, thing.idOnDevice, newStatus).flatMap {
                    deviceRepository.updateStatus(deviceId, thingId, newStatus)
                }
            }
        )

}

sealed class SwitchError {
    object DeviceNotAvailable : SwitchError()
    object DeviceNotFound : SwitchError()
    object MismatchStatusError : SwitchError()
    object ThingNotBelongingToDeviceError : SwitchError()
    object StatusAlreadySwitchedError : SwitchError()
    object StatusNotUpdatedError : SwitchError()
}
