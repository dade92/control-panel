package webapp.ports

import domain.Status
import domain.actions.ChangeStatusAction
import domain.actions.ChangeStatusRequest
import domain.messages.ChangeStatusMessage
import domain.utils.aDeviceId
import domain.utils.aThingId
import domain.utils.anIdOnDevice
import org.junit.jupiter.api.Test
import org.mockito.Mockito.verify
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@WebMvcTest(NotificationController::class)
class NotificationControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var changeStatusAction: ChangeStatusAction

    @Test
    fun `change status successfully`() {
        mvc.perform(
            post("/api/v1/notification/change-status")
                .contentType(MediaType.APPLICATION_JSON)
                .content(
                    """
                    {
                        "deviceId": "$aDeviceId",
                        "idOnDevice": "$anIdOnDevice",
                        "newStatus": "OFF"
                    }
                    """.trimIndent()
                )
        ).andExpect(status().isNoContent)

        verify(changeStatusAction).changeStatus(ChangeStatusRequest(aDeviceId, Status.OFF, anIdOnDevice))
    }

}