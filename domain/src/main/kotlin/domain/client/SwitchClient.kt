package domain.client

import arrow.core.Either
import domain.DeviceHost
import domain.IdOnDevice
import domain.Status
import domain.actions.errors.ActionError

interface SwitchClient {
    fun switch(deviceHost: DeviceHost, idOnDevice: IdOnDevice, newStatus: Status): Either<ActionError.SwitchError, Unit>
}