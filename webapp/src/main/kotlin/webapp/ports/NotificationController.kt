package webapp.ports

import org.springframework.messaging.simp.SimpMessagingTemplate
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/notification")
class NotificationController(
    private val template: SimpMessagingTemplate
) {

    @PostMapping("/change-status")
    fun changeStatus(
        @RequestBody request: ChangeStatusRequest
    ) {
        template.convertAndSend("/change-status", request.toChangeStatusMessage())
    }
}

data class ChangeStatusMessage(
    val deviceId: String,
    val thingId: String,
    val status: String
)

data class ChangeStatusRequest(
    val deviceId: String,
    val thingId: String,
    val status: String
) {
    fun toChangeStatusMessage() = ChangeStatusMessage(deviceId, thingId, status)
}