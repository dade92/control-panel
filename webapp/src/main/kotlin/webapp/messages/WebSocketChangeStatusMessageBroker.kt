package webapp.messages

import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import org.springframework.messaging.simp.SimpMessagingTemplate

class WebSocketChangeStatusMessageBroker(
    private val template: SimpMessagingTemplate
) : ChangeStatusMessageBroker {
    override fun sendChangeStatusMessage(message: ChangeStatusMessage) {
        template.convertAndSend("/change-status", message)
    }

}