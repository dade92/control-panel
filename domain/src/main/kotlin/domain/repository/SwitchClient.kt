package domain.repository

import arrow.core.Either
import domain.Device
import domain.DeviceHost
import domain.IdOnDevice
import domain.Status
import domain.actions.SwitchError

interface SwitchClient {
    fun switch(status: Status)

    fun switch(deviceHost: DeviceHost, idOnDevice: IdOnDevice, newStatus: Status): Either<SwitchError, Unit>
}