package domain.actions

import arrow.core.Either
import arrow.core.right
import domain.DeviceId
import domain.Status
import domain.ThingId
import domain.repository.SwitchClient

interface SwitchAction {
    fun switch(status: Status)
    fun switch(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit>
}

class FakeSwitchAction : SwitchAction {
    override fun switch(status: Status) {
        Thread.sleep(1000)
    }
    override fun switch(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit> {
        switch(newStatus)
        return Unit.right()
    }

}

class DefaultSwitchAction(
    private val switchClient: SwitchClient
) : SwitchAction {
    override fun switch(status: Status) {
        switchClient.switch(status)
    }

    override fun switch(
        deviceId: DeviceId,
        thingId: ThingId,
        newStatus: Status
    ): Either<SwitchError, Unit> {
        TODO("Not yet implemented")
    }

}

sealed class SwitchError {
    object DeviceNotAvailable : SwitchError()
    object MismatchStatusError : SwitchError()
    object ThingNotBelongingToDeviceError : SwitchError()
    object StatusAlreadySwitchedError: SwitchError()
}
