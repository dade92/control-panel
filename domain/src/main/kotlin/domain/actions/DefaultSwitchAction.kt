package domain.actions

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import domain.DeviceId
import domain.Status
import domain.ThingId
import domain.repository.DeviceRepository
import domain.repository.SwitchClient

interface SwitchAction {
    fun switch(status: Status)
    fun switch(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit>
}

class FakeSwitchAction : SwitchAction {
    //TODO remove this method
    override fun switch(status: Status) {
        Thread.sleep(1000)
    }

    override fun switch(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit> {
        switch(newStatus)
        return Unit.right()
    }

}

class DefaultSwitchAction(
    private val switchClient: SwitchClient,
    private val deviceRepository: DeviceRepository
) : SwitchAction {
    override fun switch(status: Status) {
        switchClient.switch(status)
    }

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
                switchClient.switch(device.host, thing.idOnDevice, newStatus)
            })

}

sealed class SwitchError {
    object DeviceNotAvailable : SwitchError()
    object MismatchStatusError : SwitchError()
    object ThingNotBelongingToDeviceError : SwitchError()
    object StatusAlreadySwitchedError : SwitchError()
}
