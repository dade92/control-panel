package domain.actions

import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import domain.repository.DeviceRepository

class ChangeStatusAction(
    private val changeStatusMessageBroker: ChangeStatusMessageBroker,
    private val deviceRepository: DeviceRepository
) {

    fun changeStatus(request: ChangeStatusMessage) {
        deviceRepository.updateThingStatus(request.deviceId, request.thingId, request.status).map {
            changeStatusMessageBroker.sendChangeStatusMessage(request)
        }
    }

}