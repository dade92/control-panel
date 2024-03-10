package domain.actions

import arrow.core.right
import domain.Status
import domain.asDeviceHost
import domain.asDeviceId
import domain.asThingId
import domain.client.SwitchClient
import domain.repository.DeviceRepository
import domain.utils.aDeviceHost
import domain.utils.aDeviceId
import domain.utils.aThingId
import domain.utils.aThingToDevice
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.impl.annotations.MockK
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

class SwitchAllOffActionTest {

    @MockK
    private val deviceRepository: DeviceRepository = mockk()

    @MockK
    private val switchClient: SwitchClient = mockk()


    private val switchAllOffAction = SwitchAllOffAction(deviceRepository, switchClient)

    @Test
    fun `switch all off`() {
        every { switchClient.switch(aDeviceHost, any(), Status.OFF) } returns Unit.right()
        every { deviceRepository.updateThingStatus(aDeviceId, aThingId, Status.OFF) } returns Unit.right()

        switchAllOffAction.switchOff(
            listOf(
                aThingToDevice(
                    thingId = aThingId,
                    deviceId = aDeviceId,
                    deviceHost = aDeviceHost
                )
            )
        ) shouldBe Unit.right()

        verify { switchClient.switch(aDeviceHost, any(), Status.OFF) }
        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, Status.OFF) }
    }
}