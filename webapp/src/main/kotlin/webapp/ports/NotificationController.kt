package webapp.ports

import domain.Status
import domain.actions.ChangeStatusAction
import domain.asDeviceId
import domain.asThingId
import domain.messages.ChangeStatusMessage
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api/v1/notification")
class NotificationController(
    private val changeStatusAction: ChangeStatusAction
) {

    @PostMapping("/change-status")
    fun changeStatus(
        @RequestBody request: ChangeStatusRequest
    ): ResponseEntity<Any> {
        changeStatusAction.changeStatus(request.toMessage())
        return ResponseEntity.noContent().build()
    }
}

data class ChangeStatusRequest(
    val deviceId: String,
    val thingId: String,
    val status: String
) {
    fun toMessage() = ChangeStatusMessage(
        deviceId = deviceId.asDeviceId(),
        thingId = thingId.asThingId(),
        status = Status.valueOf(status)
    )
}