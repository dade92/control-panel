package webapp.ports

import domain.actions.ChangeStatusAction
import domain.actions.ChangeStatusRequest
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
        changeStatusAction.changeStatus(request)
        return ResponseEntity.noContent().build()
    }
}