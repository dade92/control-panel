package domain.actions

import arrow.core.left
import arrow.core.right
import domain.*
import domain.actions.errors.ActionError
import domain.client.SwitchClient
import domain.repository.DeviceRepository
import domain.utils.aDeviceHost
import domain.utils.aDeviceId
import domain.utils.aThingId
import domain.utils.aThingToDevice
import domain.utils.anotherDeviceHost
import domain.utils.anotherDeviceId
import domain.utils.anotherThingId
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

class SwitchAllOffActionTest {

    @MockK
    private val deviceRepository = mockk<DeviceRepository>()

    @MockK
    private val switchClient = mockk<SwitchClient>()

    private val switchAllOffAction = SwitchAllOffAction(deviceRepository, switchClient)

    @Test
    fun `switch all off successfully, fire and forget`() {
        every { switchClient.switch(any(), 1.asIdOnDevice(), Status.OFF) } returns Unit.right()
        every { deviceRepository.updateThingStatus(any(), any(), Status.OFF) } returns Unit.right()

        switchAllOffAction.switchOff(
            listOf(
                aThingToDevice(
                    thingId = aThingId,
                    deviceId = aDeviceId,
                    deviceHost = aDeviceHost
                ),
                aThingToDevice(
                    thingId = anotherThingId,
                    deviceId = anotherDeviceId,
                    deviceHost = anotherDeviceHost
                )
            )
        ) shouldBe Unit.right()

        verify { switchClient.switch(aDeviceHost, 1.asIdOnDevice(), Status.OFF) }
        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, Status.OFF) }
        verify { switchClient.switch(anotherDeviceHost, 1.asIdOnDevice(), Status.OFF) }
        verify { deviceRepository.updateThingStatus(anotherDeviceId, anotherThingId, Status.OFF) }
    }

    @Test
    fun `in case at least one fails, returns error`() {
        every { switchClient.switch(aDeviceHost, 1.asIdOnDevice(), Status.OFF) } returns Unit.right()
        every { deviceRepository.updateThingStatus(any(), any(), Status.OFF) } returns Unit.right()
        every { switchClient.switch(anotherDeviceHost, 1.asIdOnDevice(), Status.OFF) } returns ActionError.SwitchError.DeviceNotFound.left()

        switchAllOffAction.switchOff(
            listOf(
                aThingToDevice(
                    thingId = aThingId,
                    deviceId = aDeviceId,
                    deviceHost = aDeviceHost
                ),
                aThingToDevice(
                    thingId = anotherThingId,
                    deviceId = anotherDeviceId,
                    deviceHost = anotherDeviceHost
                )
            )
        ) shouldBe ActionError.SwitchError.SomethingWrongWithSwitchAll.left()

        verify { switchClient.switch(aDeviceHost, 1.asIdOnDevice(), Status.OFF) }
        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, Status.OFF) }
        verify { switchClient.switch(anotherDeviceHost, 1.asIdOnDevice(), Status.OFF) }
        verify(exactly = 0) { deviceRepository.updateThingStatus(anotherDeviceId, anotherThingId, Status.OFF) }
    }
}