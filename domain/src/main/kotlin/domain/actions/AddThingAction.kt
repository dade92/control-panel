package domain.actions

import arrow.core.Either
import domain.Device
import domain.DeviceId
import domain.Status
import domain.Thing
import domain.ThingManagement
import domain.actions.errors.ActionError
import domain.actions.request.AddThingRequest
import domain.asDeviceHost
import domain.asDeviceName
import domain.asIdOnDevice
import domain.repository.DeviceRepository
import domain.utils.IdOnDeviceRetriever
import domain.utils.RandomThingIdGenerator

private val DEFAULT_THING_MANAGEMENT = ThingManagement(Status.OFF)

class AddThingAction(
    private val deviceRepository: DeviceRepository,
    private val randomThingIdGenerator: RandomThingIdGenerator,
    private val idOnDeviceRetriever: IdOnDeviceRetriever
) {

    fun add(deviceId: DeviceId, addThingRequest: AddThingRequest): Either<ActionError, Unit> =
        deviceRepository.retrieve(deviceId).fold(
            { error ->
                deviceRepository.addDevice(Device(
                    deviceId,
                    "".asDeviceName(),
                    "".asDeviceHost(),
                    listOf(Thing(
                        randomThingIdGenerator.retrieve(),
                        addThingRequest.name,
                        addThingRequest.type,
                        ThingManagement(Status.OFF),
                        1.asIdOnDevice()
                    ))
                ))
            },
            { device ->
                deviceRepository.addThing(
                    deviceId,
                    Thing(
                        randomThingIdGenerator.retrieve(),
                        addThingRequest.name,
                        addThingRequest.type,
                        DEFAULT_THING_MANAGEMENT,
                        idOnDeviceRetriever.get(device)
                    )
                )
            }
        )
}