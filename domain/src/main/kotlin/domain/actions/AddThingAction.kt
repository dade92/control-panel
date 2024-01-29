package domain.actions

import arrow.core.Either
import arrow.core.right
import domain.DeviceId
import domain.Status
import domain.Thing
import domain.ThingManagement
import domain.actions.request.AddThingRequest
import domain.asIdOnDevice
import domain.repository.DeviceRepository
import domain.utils.RandomThingIdGenerator

class AddThingAction(
    private val deviceRepository: DeviceRepository,
    private val randomThingIdGenerator: RandomThingIdGenerator
) {

    fun add(deviceId: DeviceId, addThingRequest: AddThingRequest): Either<AddThingError, Unit> =
        deviceRepository.addThing(
            deviceId,
            Thing(
                randomThingIdGenerator.retrieve(),
                addThingRequest.name,
                addThingRequest.type,
                ThingManagement(Status.OFF),
                1.asIdOnDevice()
            )
        )
}

sealed class AddThingError {

}