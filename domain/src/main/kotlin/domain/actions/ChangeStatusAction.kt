package domain.actions

import domain.DeviceId
import domain.IdOnDevice
import domain.Status
import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import domain.repository.DeviceRepository

class ChangeStatusAction(
    private val changeStatusMessageBroker: ChangeStatusMessageBroker,
    private val deviceRepository: DeviceRepository
) {
    fun changeStatus(request: ChangeStatusRequest) {
        deviceRepository.retrieve(request.deviceId).map { device ->
            device.things.firstOrNull { it.idOnDevice == request.idOnDevice }?.let { thing ->
                deviceRepository.updateThingStatus(request.deviceId, thing.id, request.status).map {
                    changeStatusMessageBroker.sendChangeStatusMessage(
                        ChangeStatusMessage(
                            request.deviceId,
                            thing.id,
                            request.status
                        )
                    )
                }
            }
        }
    }

}

data class ChangeStatusRequest(
    val deviceId: DeviceId,
    val status: Status,
    val idOnDevice: IdOnDevice
)
