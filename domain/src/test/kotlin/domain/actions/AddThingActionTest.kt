package domain.actions

import arrow.core.left
import arrow.core.right
import domain.Status
import domain.Thing
import domain.ThingManagement
import domain.ThingType
import domain.actions.errors.ActionError
import domain.actions.request.AddThingRequest
import domain.asIdOnDevice
import domain.repository.DeviceRepository
import domain.utils.IdOnDeviceRetriever
import domain.utils.RandomThingIdGenerator
import domain.utils.aDevice
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

    private val idOnDeviceRetriever = mockk<IdOnDeviceRetriever>()

    private val addThingAction = AddThingAction(deviceRepository, randomThingIdGenerator, idOnDeviceRetriever)

    @Test
    fun `happy path`() {
        val result = Unit.right()
        val device = aDevice()
        val idOnDevice = 1.asIdOnDevice()

        every { randomThingIdGenerator.retrieve() } returns aThingId
        every { deviceRepository.retrieve(aDeviceId) } returns device.right()
        every { idOnDeviceRetriever.get(device) } returns idOnDevice
        every {
            deviceRepository.addThing(
                aDeviceId,
                Thing(aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), idOnDevice)
            )
        } returns result

        addThingAction.add(aDeviceId, AddThingRequest(aThingName, ThingType.LAMP)) shouldBe result
    }

    //TODO fix this test, understand what to do
    @Test
    fun `device not found`() {
        every { randomThingIdGenerator.retrieve() } returns aThingId
        every { deviceRepository.retrieve(aDeviceId) } returns ActionError.RetrieveError.DeviceRetrieveError.left()

        addThingAction.add(aDeviceId, AddThingRequest(aThingName, ThingType.LAMP)) shouldBe ActionError.AddThingError.MongoAddError.left()
    }
}