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
    private val randomIdGenerator: RandomThingIdGenerator,
    private val idOnDeviceRetriever: IdOnDeviceRetriever
) {

    fun add(addThingRequest: AddThingRequest): Either<ActionError, Thing> =
        addThingRequest.deviceId?.let {
            deviceRepository.retrieve(addThingRequest.deviceId).fold(
                {
                    addDeviceWithThing(addThingRequest)
                },
                { device ->
                    val addedThing = Thing(
                        randomIdGenerator.retrieveThingId(),
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
        } ?: addDeviceWithThing(addThingRequest)

    private fun addDeviceWithThing(
        addThingRequest: AddThingRequest
    ): Either<ActionError, Thing> {
        val addedThing = Thing(
            randomIdGenerator.retrieveThingId(),
            addThingRequest.name,
            addThingRequest.type,
            DEFAULT_THING_MANAGEMENT,
            1.asIdOnDevice()
        )

        return deviceRepository.addDevice(
            Device(
                randomIdGenerator.retrieveDeviceId(),
                "".asDeviceName(),
                "".asDeviceHost(),
                listOf(addedThing)
            )
        ).flatMap {
            addedThing.right()
        }
    }
}
