package domain.repository

import arrow.core.Either
import domain.DeviceHost
import domain.IdOnDevice
import domain.Status
import domain.actions.SwitchError

interface SwitchClient {
    //TODO should we pass the entire device with the thing?
    fun switch(deviceHost: DeviceHost, idOnDevice: IdOnDevice, newStatus: Status): Either<SwitchError, Unit>
}