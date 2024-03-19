package domain.repository

import arrow.core.Either
import domain.*
import domain.actions.errors.ActionError
import domain.actions.errors.ActionError.UpdateError

interface DeviceRepository {
    fun retrieve(deviceId: DeviceId): Either<ActionError.RetrieveError, Device>
    fun retrieveAll(): Either<ActionError.RetrieveError, List<Device>>
    fun updateThingStatus(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<ActionError.SwitchError, Unit>
    fun removeThing(deviceId: DeviceId, thingId: ThingId): Either<ActionError.RetrieveError, Unit>
    fun addThing(deviceId: DeviceId, thing: Thing): Either<ActionError.AddError, Unit>
    fun addDevice(device: Device): Either<ActionError.AddError, Unit>
    fun removeDevice(deviceId: DeviceId): Either<ActionError.RetrieveError.DeviceRemoveError, Unit>
    fun changeDeviceHost(deviceId: DeviceId, deviceHost: DeviceHost): Either<UpdateError, Unit>
}