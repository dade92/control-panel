package domain.actions

import arrow.core.right
import domain.Status
import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import domain.repository.DeviceRepository
import domain.utils.aDeviceId
import domain.utils.aThingId
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

class ChangeStatusActionTest {

    @MockK
    private val changeStatusMessageBroker = mockk<ChangeStatusMessageBroker>()

    @MockK
    private val deviceRepository = mockk<DeviceRepository>()

    private val changeStatusAction = ChangeStatusAction(changeStatusMessageBroker, deviceRepository)

    @Test
    fun `happy path`() {
        every { deviceRepository.updateThingStatus(any(), any(), any()) } returns Unit.right()
        every { changeStatusMessageBroker.sendChangeStatusMessage(any()) } returns Unit

        changeStatusAction.changeStatus(ChangeStatusMessage(aDeviceId, aThingId, Status.OFF))

        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, Status.OFF) }
        verify {
            changeStatusMessageBroker.sendChangeStatusMessage(
                ChangeStatusMessage(
                    aDeviceId,
                    aThingId,
                    Status.OFF
                )
            )
        }
    }
}