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
            device[request.idOnDevice]?.let { thing ->
                deviceRepository.updateThingStatus(request.deviceId, thing.id, request.newStatus).map {
                    changeStatusMessageBroker.sendChangeStatusMessage(
                        ChangeStatusMessage(
                            request.deviceId,
                            thing.id,
                            request.newStatus
                        )
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
)
