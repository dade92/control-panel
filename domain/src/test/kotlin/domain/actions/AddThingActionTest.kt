package domain.actions

import arrow.core.left
import arrow.core.right
import domain.*
import domain.actions.errors.ActionError.AddError.AddDeviceError
import domain.actions.errors.ActionError.AddError.AddThingError
import domain.actions.errors.ActionError.RetrieveError.DeviceRetrieveError
import domain.actions.request.AddThingRequest
import domain.repository.DeviceRepository
import domain.utils.*
import io.kotest.matchers.shouldBe
import io.mockk.every
import io.mockk.mockk
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test

class AddThingActionTest {

    private val deviceRepository = mockk<DeviceRepository>()

    private val randomIdGenerator = mockk<RandomIdGenerator>()

    private val idOnDeviceRetriever = mockk<IdOnDeviceRetriever>()

    private val deviceNameGenerator = mockk<DeviceNameGenerator>()

    private val addThingAction =
        AddThingAction(deviceRepository, randomIdGenerator, idOnDeviceRetriever, deviceNameGenerator)

    @BeforeEach
    fun setUp() {
        every { deviceNameGenerator.generate() } returns anotherDeviceName
    }

    @Test
    fun `no device id provided, create a new one`() {
        val idOnDevice = 1.asIdOnDevice()
        val addedThing = Thing(aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), idOnDevice)

        every { randomIdGenerator.retrieveThingId() } returns aThingId
        every { randomIdGenerator.retrieveDeviceId() } returns anotherDeviceId
        every {
            deviceRepository.addDevice(
                Device(
                    anotherDeviceId,
                    anotherDeviceName,
                    "".asDeviceHost(),
                    listOf(addedThing)
                )
            )
        } returns Unit.right()

        addThingAction.add(AddThingRequest(null, aThingName, ThingType.LAMP)) shouldBe ThingToDevice(
            aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), anotherDeviceId, anotherDeviceName
        ).right()
    }

    @Test
    fun `add thing on an already existing device`() {
        val device = aDevice()
        val idOnDevice = 1.asIdOnDevice()
        val addedThing = Thing(aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), idOnDevice)

        every { randomIdGenerator.retrieveThingId() } returns aThingId
        every { deviceRepository.retrieve(aDeviceId) } returns device.right()
        every { idOnDeviceRetriever.get(device) } returns idOnDevice
        every {
            deviceRepository.addThing(
                aDeviceId,
                addedThing
            )
        } returns Unit.right()

        addThingAction.add(AddThingRequest(aDeviceId, aThingName, ThingType.LAMP)) shouldBe ThingToDevice(
            aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), aDeviceId, aDeviceName
        ).right()
    }

    @Test
    fun `add thing fails`() {
        val device = aDevice()
        val idOnDevice = 1.asIdOnDevice()
        val addedThing = Thing(aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), idOnDevice)
        val error = AddThingError.left()

        every { randomIdGenerator.retrieveThingId() } returns aThingId
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

        every { randomIdGenerator.retrieveThingId() } returns aThingId
        every { randomIdGenerator.retrieveDeviceId() } returns anotherDeviceId
        every { deviceRepository.retrieve(aDeviceId) } returns DeviceRetrieveError.left()
        every {
            deviceRepository.addDevice(
                Device(
                    anotherDeviceId,
                    anotherDeviceName,
                    "".asDeviceHost(),
                    listOf(addedThing)
                )
            )
        } returns Unit.right()

        addThingAction.add(AddThingRequest(aDeviceId, aThingName, thingType)) shouldBe ThingToDevice(
            aThingId, aThingName, ThingType.LAMP, ThingManagement(Status.OFF), anotherDeviceId, anotherDeviceName
        ).right()
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

        every { randomIdGenerator.retrieveThingId() } returns aThingId
        every { randomIdGenerator.retrieveDeviceId() } returns anotherDeviceId
        every { deviceRepository.retrieve(aDeviceId) } returns DeviceRetrieveError.left()
        every {
            deviceRepository.addDevice(
                Device(
                    anotherDeviceId,
                    anotherDeviceName,
                    "".asDeviceHost(),
                    listOf(addedThing)
                )
            )
        } returns error

        addThingAction.add(AddThingRequest(aDeviceId, aThingName, thingType)) shouldBe error
    }
}