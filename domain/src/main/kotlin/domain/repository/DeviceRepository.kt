package domain.repository

import arrow.core.Either
import domain.Device
import domain.DeviceId
import domain.Status
import domain.Thing
import domain.ThingId
import domain.actions.errors.ActionError

interface DeviceRepository {
    fun retrieve(deviceId: DeviceId): Either<ActionError.RetrieveError, Device>
    fun retrieveAll(): Either<ActionError.RetrieveError, List<Device>>
    fun updateThingStatus(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<ActionError.SwitchError, Unit>
    fun removeThing(deviceId: DeviceId, thingId: ThingId): Either<ActionError.RetrieveError, Unit>
    fun addThing(deviceId: DeviceId, thing: Thing): Either<ActionError.AddError, Unit>
    fun addDevice(device: Device): Either<ActionError.AddError, Unit>
}