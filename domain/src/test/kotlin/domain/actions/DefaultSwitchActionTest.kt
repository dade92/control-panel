package domain.actions

import arrow.core.left
import arrow.core.right
import domain.Status
import domain.asDeviceHost
import domain.asIdOnDevice
import domain.asThingId
import domain.repository.DeviceRepository
import domain.repository.RetrieveError
import domain.repository.SwitchClient
import domain.utils.aDevice
import domain.utils.aDeviceId
import domain.utils.aThing
import domain.utils.aThingId
import io.kotest.matchers.shouldBe
import io.mockk.Called
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test
import java.util.UUID

class DefaultSwitchActionTest {

    private val switchClient = mockk<SwitchClient>()

    private val deviceRepository = mockk<DeviceRepository>()

    private val defaultSwitchAction = DefaultSwitchAction(switchClient, deviceRepository)

    @Test
    fun `switch the status of a thing successfully`() {
        val deviceHost = "XXX".asDeviceHost()
        val newStatus = Status.ON
        val idOnDevice = 1.asIdOnDevice()

        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
            deviceHost = deviceHost,
            things = listOf(
                aThing(
                    thingId = aThingId,
                    idOnDevice = idOnDevice
                ),
                aThing(
                    thingId = UUID.randomUUID().asThingId(),
                    idOnDevice = 2.asIdOnDevice()
                ),
            )
        ).right()
        every { switchClient.switch(deviceHost, idOnDevice, newStatus) } returns Unit.right()

        defaultSwitchAction.switch(aDeviceId, aThingId, newStatus) shouldBe Unit.right()

        verify { switchClient.switch(deviceHost, idOnDevice, newStatus) }
    }

    @Test
    fun `device not found`() {
        val newStatus = Status.ON

        every { deviceRepository.retrieve(aDeviceId) } returns RetrieveError.DeviceRetrieveError.left()

        defaultSwitchAction.switch(aDeviceId, aThingId, newStatus) shouldBe SwitchError.DeviceNotAvailable.left()

        verify { switchClient wasNot Called }
    }

    @Test
    fun `switch fails`() {
        val deviceHost = "XXX".asDeviceHost()
        val newStatus = Status.ON
        val idOnDevice = 1.asIdOnDevice()
        val expectedError = SwitchError.StatusAlreadySwitchedError.left()

        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
            deviceHost = deviceHost,
            things = listOf(
                aThing(
                    thingId = aThingId,
                    idOnDevice = idOnDevice
                ),
                aThing(
                    thingId = UUID.randomUUID().asThingId(),
                    idOnDevice = 2.asIdOnDevice()
                ),
            )
        ).right()
        every { switchClient.switch(deviceHost, idOnDevice, newStatus) } returns expectedError

        defaultSwitchAction.switch(aDeviceId, aThingId, newStatus) shouldBe expectedError

        verify { switchClient.switch(deviceHost, idOnDevice, newStatus) }
    }
}