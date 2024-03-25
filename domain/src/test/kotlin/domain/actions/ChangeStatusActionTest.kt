package domain.actions

import arrow.core.left
import arrow.core.right
import domain.Status
import domain.actions.errors.ActionError
import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker
import domain.repository.DeviceRepository
import domain.utils.aDevice
import domain.utils.aDeviceId
import domain.utils.aThing
import domain.utils.aThingId
import domain.utils.anIdOnDevice
import domain.utils.anotherIdOnDevice
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Nested
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

    @Nested
    inner class Failures {
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

        @Test
        fun `in case it cannot update the status on the db, don't send the message`() {
            every { deviceRepository.updateThingStatus(any(), any(), any()) } returns ActionError.SwitchError.StatusNotUpdatedError.left()
            every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
                things = listOf(
                    aThing(
                        thingId = aThingId,
                        idOnDevice = anIdOnDevice
                    )
                )
            ).right()

            changeStatusAction.changeStatus(ChangeStatusRequest(aDeviceId, Status.OFF, anIdOnDevice))

            verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, Status.OFF) }
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

        @Test
        fun `in case device does not exist - does not send the message`() {
            every { deviceRepository.retrieve(aDeviceId) } returns ActionError.RetrieveError.DeviceNotFound.left()

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
}