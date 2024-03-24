package domain.actions

import domain.DeviceId
import domain.IdOnDevice
import domain.Status
import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import domain.repository.DeviceRepository

data class ChangeStatusRequest(
    val deviceId: DeviceId,
    val status: Status,
    val idOnDevice: IdOnDevice
)

class ChangeStatusAction(
    private val changeStatusMessageBroker: ChangeStatusMessageBroker,
    private val deviceRepository: DeviceRepository
) {

    fun changeStatus(message: ChangeStatusRequest) {
        deviceRepository.retrieve(message.deviceId).map { device ->
            device.things.firstOrNull { it.idOnDevice == message.idOnDevice }?.let { thing ->
                deviceRepository.updateThingStatus(message.deviceId, thing.id, message.status).map {
                    changeStatusMessageBroker.sendChangeStatusMessage(ChangeStatusMessage(message.deviceId, thing.id, message.status))
                }
            }
        }
    }

}