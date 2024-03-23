package webapp.ports

import org.springframework.messaging.simp.SimpMessagingTemplate

class ChangeStatusUseCase(
    private val template: SimpMessagingTemplate
) {

    fun changeStatus(request: ChangeStatusRequest) {
        template.convertAndSend("/change-status", request.toChangeStatusMessage())
    }

}

data class ChangeStatusMessage(
    val deviceId: String,
    val thingId: String,
    val status: String
)