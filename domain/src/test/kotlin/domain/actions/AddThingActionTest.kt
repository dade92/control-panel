package domain.actions

import arrow.core.left
import arrow.core.right
import domain.*
import domain.actions.errors.ActionError
import domain.actions.errors.ActionError.AddError
import domain.actions.errors.ActionError.AddError.*
import domain.actions.errors.ActionError.RetrieveError.DeviceRetrieveError
import domain.actions.request.AddThingRequest
import domain.repository.DeviceRepository
import domain.utils.*
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
        val device = aDevice()
        val idOnDevice = 1.asIdOnDevice()
        val addedThing = Thing(aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), idOnDevice)

        every { randomThingIdGenerator.retrieve() } returns aThingId
        every { deviceRepository.retrieve(aDeviceId) } returns device.right()
        every { idOnDeviceRetriever.get(device) } returns idOnDevice
        every {
            deviceRepository.addThing(
                aDeviceId,
                addedThing
            )
        } returns Unit.right()

        addThingAction.add(AddThingRequest(aDeviceId, aThingName, ThingType.LAMP)) shouldBe addedThing.right()
    }

    @Test
    fun `add thing fails`() {
        val device = aDevice()
        val idOnDevice = 1.asIdOnDevice()
        val addedThing = Thing(aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), idOnDevice)
        val error = AddThingError.left()

        every { randomThingIdGenerator.retrieve() } returns aThingId
        every { deviceRepository.retrieve(aDeviceId) } returns device.right()
        every { idOnDeviceRetriever.get(device) } returns idOnDevice
        every {
            deviceRepository.addThing(
                aDeviceId,
                addedThing
            )
        } returns error

        addThingAction.add(AddThingRequest(aDeviceId, aThingName, ThingType.LAMP)) shouldBe error
    }

    @Test
    fun `device not found, create a new one`() {
        val thingType = ThingType.LAMP
        val addedThing = Thing(
            aThingId,
            aThingName,
            thingType,
            ThingManagement(
                Status.OFF
            ),
            1.asIdOnDevice()
        )

        every { randomThingIdGenerator.retrieve() } returns aThingId
        every { deviceRepository.retrieve(aDeviceId) } returns DeviceRetrieveError.left()
        every {
            deviceRepository.addDevice(
                Device(
                    aDeviceId,
                    "".asDeviceName(),
                    "".asDeviceHost(),
                    listOf(addedThing)
                )
            )
        } returns Unit.right()

        addThingAction.add(AddThingRequest(aDeviceId, aThingName, thingType)) shouldBe addedThing.right()
    }

    @Test
    fun `device not found, creates a new one and fails`() {
        val thingType = ThingType.LAMP
        val addedThing = Thing(
            aThingId,
            aThingName,
            thingType,
            ThingManagement(
                Status.OFF
            ),
            1.asIdOnDevice()
        )
        val error = AddDeviceError.left()

        every { randomThingIdGenerator.retrieve() } returns aThingId
        every { deviceRepository.retrieve(aDeviceId) } returns DeviceRetrieveError.left()
        every {
            deviceRepository.addDevice(
                Device(
                    aDeviceId,
                    "".asDeviceName(),
                    "".asDeviceHost(),
                    listOf(addedThing)
                )
            )
        } returns error

        addThingAction.add(AddThingRequest(aDeviceId, aThingName, thingType)) shouldBe error
    }
}