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

    fun add(addThingRequest: AddThingRequest): Either<ActionError, AddedThing> =
        addThingRequest.deviceId?.let {
            deviceRepository.retrieve(addThingRequest.deviceId).fold(
                {
                    addNewDeviceWithThing(addThingRequest)
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
                        AddedThing(
                            addedThing.id,
                            addedThing.name,
                            addedThing.type,
                            addedThing.management,
                            device.deviceId,
                            device.deviceName
                        ).right()
                    }
                }
            )
        } ?: addNewDeviceWithThing(addThingRequest)

    private fun addNewDeviceWithThing(
        addThingRequest: AddThingRequest
    ): Either<ActionError, AddedThing> {
        val addedThing = Thing(
            randomIdGenerator.retrieveThingId(),
            addThingRequest.name,
            addThingRequest.type,
            DEFAULT_THING_MANAGEMENT,
            1.asIdOnDevice()
        )
        val newDeviceId = randomIdGenerator.retrieveDeviceId()

        return deviceRepository.addDevice(
            Device(
                newDeviceId,
                "".asDeviceName(),
                "".asDeviceHost(),
                listOf(addedThing)
            )
        ).flatMap {
            AddedThing(
                addedThing.id,
                addedThing.name,
                addedThing.type,
                addedThing.management,
                newDeviceId,
                "".asDeviceName()
            ).right()
        }
    }
}

data class AddedThing(
    val id: ThingId,
    val name: ThingName,
    val type: ThingType,
    val management: ThingManagement,
    val deviceId: DeviceId,
    val device: DeviceName
)
