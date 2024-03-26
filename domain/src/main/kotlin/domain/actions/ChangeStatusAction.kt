package domain.actions

import domain.DeviceId
import domain.IdOnDevice
import domain.Status
import domain.ThingId
import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import domain.repository.DeviceRepository

class ChangeStatusAction(
    private val changeStatusMessageBroker: ChangeStatusMessageBroker,
    private val deviceRepository: DeviceRepository
) {
    fun changeStatus(request: ChangeStatusRequest) {
        deviceRepository.retrieve(request.deviceId).map { device ->
            device[request.idOnDevice]?.let { thing ->
                deviceRepository.updateThingStatus(request.deviceId, thing.id, request.newStatus).map {
                    changeStatusMessageBroker.sendChangeStatusMessage(
                        request.toChangeStatusMessage(thing.id)
                    )
                }
            }
        }
    }

}

data class ChangeStatusRequest(
    val deviceId: DeviceId,
    val newStatus: Status,
    val idOnDevice: IdOnDevice
) {
    fun toChangeStatusMessage(thingId: ThingId): ChangeStatusMessage = ChangeStatusMessage(
        deviceId,
        thingId,
        newStatus
    )
}
