package domain.repository

import arrow.core.Either
import domain.Device
import domain.DeviceId
import domain.Status
import domain.ThingId
import domain.actions.SwitchError

interface DeviceRepository {
    fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device>
    fun retrieveAll(): Either<RetrieveError, List<Device>>

    fun updateStatus(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit>

}

sealed class RetrieveError {
    object DeviceRetrieveError: RetrieveError()
}