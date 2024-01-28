package domain.actions

import arrow.core.right
import domain.repository.DeviceRepository
import domain.utils.aDeviceId
import domain.utils.aThingId
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test

class RemoveThingsActionTest {

    private val deviceRepository = mockk<DeviceRepository>()

    private val removeThingsAction = RemoveThingsAction(deviceRepository)

    @Test
    fun `calls the device repository to remove the thing`() {
        val result = Unit.right()

        every { deviceRepository.removeThing(aDeviceId, aThingId) } returns result

        removeThingsAction.remove(aDeviceId, aThingId) shouldBe result
    }
}