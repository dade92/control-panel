package webapp.ports

import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import org.springframework.messaging.simp.SimpMessagingTemplate

class WebSocketChangeStatusMessageBroker(
    private val template: SimpMessagingTemplate
) : ChangeStatusMessageBroker {
    override fun sendChangeStatusMessage(request: ChangeStatusMessage) {
        template.convertAndSend("/topic/change-status", request)
    }


}