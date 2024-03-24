package domain.actions

import arrow.core.right
import domain.Status
import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import domain.repository.DeviceRepository
import domain.utils.*
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
        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
            things = listOf(
                aThing(
                    thingId = aThingId,
                    idOnDevice = anIdOnDevice
                )
            )
        ).right()
        every { changeStatusMessageBroker.sendChangeStatusMessage(any()) } returns Unit

        changeStatusAction.changeStatus(ChangeStatusRequest(aDeviceId, Status.OFF, anIdOnDevice))

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

    @Test
    fun `in case of wrong id on device, do nothing`() {
        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
            things = listOf(
                aThing(
                    thingId = aThingId,
                    idOnDevice = anotherIdOnDevice
                )
            )
        ).right()

        changeStatusAction.changeStatus(ChangeStatusRequest(aDeviceId, Status.OFF, anIdOnDevice))

        verify(exactly = 0) { deviceRepository.updateThingStatus(aDeviceId, aThingId, Status.OFF) }
        verify(exactly = 0) {
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