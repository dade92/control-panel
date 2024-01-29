package domain.repository

import arrow.core.Either
import domain.Device
import domain.DeviceId
import domain.Status
import domain.Thing
import domain.ThingId
import domain.actions.AddThingError
import domain.actions.SwitchError

interface DeviceRepository {
    fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device>
    fun retrieveAll(): Either<RetrieveError, List<Device>>
    fun updateThingStatus(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit>
    fun removeThing(deviceId: DeviceId, thingId: ThingId): Either<RetrieveError, Unit>
    fun addThing(deviceId: DeviceId, thing: Thing): Either<AddThingError, Unit>
}

sealed class RetrieveError {
    object DeviceRetrieveError : RetrieveError()
    object DeviceRemoveError : RetrieveError()
}