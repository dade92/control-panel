package domain.actions

import arrow.core.Either
import arrow.core.flatMap
import arrow.core.right
import domain.*
import domain.actions.errors.ActionError
import domain.actions.request.AddThingRequest
import domain.repository.DeviceRepository
import domain.utils.IdOnDeviceRetriever
import domain.utils.RandomThingIdGenerator

private val DEFAULT_THING_MANAGEMENT = ThingManagement(Status.OFF)

class AddThingAction(
    private val deviceRepository: DeviceRepository,
    private val randomThingIdGenerator: RandomThingIdGenerator,
    private val idOnDeviceRetriever: IdOnDeviceRetriever
) {

    fun add(addThingRequest: AddThingRequest): Either<ActionError, Thing> =
        deviceRepository.retrieve(addThingRequest.deviceId).fold(
            { error ->
                val addedThing = Thing(
                    randomThingIdGenerator.retrieve(),
                    addThingRequest.name,
                    addThingRequest.type,
                    DEFAULT_THING_MANAGEMENT,
                    1.asIdOnDevice()
                )
                deviceRepository.addDevice(
                    Device(
                        addThingRequest.deviceId,
                        "".asDeviceName(),
                        "".asDeviceHost(),
                        listOf(addedThing)
                    )
                ).flatMap {
                    addedThing.right()
                }
            },
            { device ->
                val addedThing = Thing(
                    randomThingIdGenerator.retrieve(),
                    addThingRequest.name,
                    addThingRequest.type,
                    DEFAULT_THING_MANAGEMENT,
                    idOnDeviceRetriever.get(device)
                )
                deviceRepository.addThing(
                    addThingRequest.deviceId,
                    addedThing
                ).flatMap {
                    addedThing.right()
                }
            }
        )
}