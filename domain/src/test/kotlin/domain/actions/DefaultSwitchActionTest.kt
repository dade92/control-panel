package domain.actions

import arrow.core.left
import arrow.core.right
import domain.Status
import domain.actions.errors.ActionError.RetrieveError
import domain.actions.errors.ActionError.SwitchError.*
import domain.asDeviceHost
import domain.asIdOnDevice
import domain.repository.DeviceRepository
import domain.client.SwitchClient
import domain.utils.aDevice
import domain.utils.aDeviceId
import domain.utils.aThing
import domain.utils.aThingId
import domain.utils.anotherThingId
import io.kotest.matchers.shouldBe
import io.mockk.Called
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

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
                    thingId = anotherThingId,
                    idOnDevice = 2.asIdOnDevice()
                ),
            )
        ).right()
        every { switchClient.switch(deviceHost, idOnDevice, newStatus) } returns Unit.right()
        every { deviceRepository.updateThingStatus(aDeviceId, aThingId, newStatus) } returns Unit.right()

        defaultSwitchAction.switch(aDeviceId, aThingId, newStatus) shouldBe Unit.right()

        verify { switchClient.switch(deviceHost, idOnDevice, newStatus) }
        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, newStatus) }
    }

    @Test
    fun `device not found`() {
        val newStatus = Status.ON

        val expectedError = RetrieveError.DeviceRetrieveError.left()

        every { deviceRepository.retrieve(aDeviceId) } returns expectedError

        defaultSwitchAction.switch(aDeviceId, aThingId, newStatus) shouldBe expectedError

        verify { switchClient wasNot Called }
    }

    @Test
    fun `thing not found`() {
        val deviceHost = "XXX".asDeviceHost()
        val newStatus = Status.ON
        val idOnDevice = 1.asIdOnDevice()

        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
            deviceHost = deviceHost,
            things = listOf(
                aThing(
                    thingId = aThingId,
                    idOnDevice = idOnDevice
                )
            )
        ).right()

        defaultSwitchAction.switch(aDeviceId, anotherThingId, newStatus) shouldBe ThingNotFound.left()

        verify { switchClient wasNot Called }
        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, newStatus) wasNot Called }
    }

    @Test
    fun `switch fails`() {
        val deviceHost = "XXX".asDeviceHost()
        val newStatus = Status.ON
        val idOnDevice = 1.asIdOnDevice()
        val expectedError = StatusAlreadySwitchedError.left()

        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
            deviceHost = deviceHost,
            things = listOf(
                aThing(
                    thingId = aThingId,
                    idOnDevice = idOnDevice
                ),
                aThing(
                    thingId = aThingId,
                    idOnDevice = 2.asIdOnDevice()
                ),
            )
        ).right()
        every { switchClient.switch(deviceHost, idOnDevice, newStatus) } returns expectedError

        defaultSwitchAction.switch(aDeviceId, aThingId, newStatus) shouldBe expectedError

        verify { switchClient.switch(deviceHost, idOnDevice, newStatus) }
        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, newStatus) wasNot Called }
    }

    @Test
    fun `update status on DB fails`() {
        val deviceHost = "XXX".asDeviceHost()
        val newStatus = Status.ON
        val idOnDevice = 1.asIdOnDevice()
        val expectedError = StatusNotUpdatedError.left()

        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(
            deviceHost = deviceHost,
            things = listOf(
                aThing(
                    thingId = aThingId,
                    idOnDevice = idOnDevice
                ),
                aThing(
                    thingId = anotherThingId,
                    idOnDevice = 2.asIdOnDevice()
                ),
            )
        ).right()
        every { switchClient.switch(deviceHost, idOnDevice, newStatus) } returns Unit.right()
        every { deviceRepository.updateThingStatus(aDeviceId, aThingId, newStatus) } returns expectedError

        defaultSwitchAction.switch(aDeviceId, aThingId, newStatus) shouldBe expectedError

        verify { switchClient.switch(deviceHost, idOnDevice, newStatus) }
        verify { deviceRepository.updateThingStatus(aDeviceId, aThingId, newStatus) }
    }
}