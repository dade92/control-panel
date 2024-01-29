package domain.actions

import arrow.core.right
import domain.Status
import domain.Thing
import domain.ThingManagement
import domain.ThingType
import domain.actions.request.AddThingRequest
import domain.asIdOnDevice
import domain.repository.DeviceRepository
import domain.utils.RandomThingIdGenerator
import domain.utils.aDeviceId
import domain.utils.aThingId
import domain.utils.aThingName
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.Test

class AddThingActionTest {

    private val deviceRepository = mockk<DeviceRepository>()

    private val randomThingIdGenerator = mockk<RandomThingIdGenerator>()

    private val addThingAction = AddThingAction(deviceRepository, randomThingIdGenerator)

    @Test
    fun `happy path`() {
        val result = Unit.right()

        every { randomThingIdGenerator.retrieve() } returns aThingId
        every {
            deviceRepository.addThing(
                aDeviceId,
                Thing(aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), 1.asIdOnDevice())
            )
        } returns result

        addThingAction.add(aDeviceId, AddThingRequest(aThingName, ThingType.LAMP)) shouldBe result
    }
}