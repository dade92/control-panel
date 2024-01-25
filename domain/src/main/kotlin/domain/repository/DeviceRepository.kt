package domain.repository

import arrow.core.Either
import domain.Device
import domain.DeviceId

interface DeviceRepository {
    fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device>

}

sealed class RetrieveError {
    object DeviceRetrieveError: RetrieveError()
}