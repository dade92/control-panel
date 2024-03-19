package domain.actions

import arrow.core.left
import arrow.core.right
import domain.actions.errors.ActionError
import domain.repository.DeviceRepository
import domain.utils.aDevice
import domain.utils.aDeviceId
import domain.utils.aThingId
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk
import io.mockk.verify
import org.junit.jupiter.api.Test

class RemoveThingsActionTest {

    private val deviceRepository = mockk<DeviceRepository>()

    private val removeThingsAction = RemoveThingsAction(deviceRepository)

    @Test
    fun `remove the thing successfully, if no things attached, remove the device too`() {
        val result = Unit.right()

        every { deviceRepository.removeThing(aDeviceId, aThingId) } returns Unit.right()
        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(things = emptyList()).right()
        every { deviceRepository.removeDevice(aDeviceId) } returns result

        removeThingsAction.remove(aDeviceId, aThingId) shouldBe result
    }

    @Test
    fun `remove device call is fire and forget`() {
        val result = Unit.right()

        every { deviceRepository.removeThing(aDeviceId, aThingId) } returns Unit.right()
        every { deviceRepository.retrieve(aDeviceId) } returns aDevice(things = emptyList()).right()
        every { deviceRepository.removeDevice(aDeviceId) } returns ActionError.RetrieveError.DeviceRemoveError.left()

        removeThingsAction.remove(aDeviceId, aThingId) shouldBe result
    }
}