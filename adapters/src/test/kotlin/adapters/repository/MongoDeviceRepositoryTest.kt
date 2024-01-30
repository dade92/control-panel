package adapters.repository

import adapters.configuration.MongoConfiguration
import adapters.configuration.RepositoryConfiguration
import arrow.core.right
import domain.Device
import domain.Status
import domain.Thing
import domain.ThingManagement
import domain.ThingType
import domain.asDeviceHost
import domain.asDeviceId
import domain.asDeviceName
import domain.asIdOnDevice
import domain.asThingId
import domain.asThingName
import domain.repository.DeviceRepository
import domain.utils.aDeviceId
import domain.utils.anotherDeviceId
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.annotation.DirtiesContext
import org.testcontainers.junit.jupiter.Testcontainers

@SpringBootTest(classes = [RepositoryConfiguration::class, MongoConfiguration::class, MongoDBTestContainerConfig::class])
@Testcontainers
class MongoDeviceRepositoryTest {

    @Autowired
    private lateinit var mongoDeviceRepository: DeviceRepository

    @Test
    fun `retrieve all devices`() {
        mongoDeviceRepository.retrieveAll() shouldBe listOf(
            Device(
                "0da34700-1ed4-4ee5-8bac-4c2ab5ddeadb".asDeviceId(),
                "arduino-uno".asDeviceName(),
                "http://esp32s3-654e44:8080".asDeviceHost(),
                listOf(
                    Thing(
                        "8a1ea8db-fffa-4c6f-935e-39a34eba871c".asThingId(),
                        "kitchen lamp".asThingName(),
                        ThingType.LAMP,
                        ThingManagement(Status.OFF),
                        1.asIdOnDevice()
                    ),
                    Thing(
                        "19851c6d-89ad-48c9-9b0c-9abb9eb92eea".asThingId(),
                        "dining room lamp".asThingName(),
                        ThingType.LAMP,
                        ThingManagement(Status.ON),
                        2.asIdOnDevice()
                    ),
                )
            ),
            Device(
                "10152e1b-d6d4-4536-8679-52a0446dc753".asDeviceId(),
                "arduino-uno-mega".asDeviceName(),
                "http://esp32s3-654e44:8080".asDeviceHost(),
                listOf(
                    Thing(
                        "392325c0-f023-4a87-95d2-2ca041bb5627".asThingId(),
                        "kitchen lamp".asThingName(),
                        ThingType.ALARM,
                        ThingManagement(Status.OFF),
                        1.asIdOnDevice()
                    ),
                )
            )
        ).right()
    }

    @Test
    fun `retrieve a device`() {
        mongoDeviceRepository.retrieve(anotherDeviceId) shouldBe Device(
            anotherDeviceId,
            "arduino-uno-mega".asDeviceName(),
            "http://esp32s3-654e44:8080".asDeviceHost(),
            listOf(
                Thing(
                    "392325c0-f023-4a87-95d2-2ca041bb5627".asThingId(),
                    "kitchen lamp".asThingName(),
                    ThingType.ALARM,
                    ThingManagement(Status.OFF),
                    1.asIdOnDevice()
                ),
            )
        ).right()
    }

    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    @Test
    fun `update status`() {
        mongoDeviceRepository.updateThingStatus(
            aDeviceId,
            "8a1ea8db-fffa-4c6f-935e-39a34eba871c".asThingId(),
            Status.ON
        ) shouldBe Unit.right()

        mongoDeviceRepository.retrieve(aDeviceId) shouldBe Device(
            aDeviceId,
            "arduino-uno".asDeviceName(),
            "http://esp32s3-654e44:8080".asDeviceHost(),
            listOf(
                Thing(
                    "8a1ea8db-fffa-4c6f-935e-39a34eba871c".asThingId(),
                    "kitchen lamp".asThingName(),
                    ThingType.LAMP,
                    ThingManagement(Status.ON),
                    1.asIdOnDevice()
                ),
                Thing(
                    "19851c6d-89ad-48c9-9b0c-9abb9eb92eea".asThingId(),
                    "dining room lamp".asThingName(),
                    ThingType.LAMP,
                    ThingManagement(Status.ON),
                    2.asIdOnDevice()
                ),
            )
        ).right()
    }

    @DirtiesContext(methodMode = DirtiesContext.MethodMode.AFTER_METHOD)
    @Test
    fun `remove a thing on a device, then add a thing on another device`() {
        mongoDeviceRepository.removeThing(aDeviceId, "19851c6d-89ad-48c9-9b0c-9abb9eb92eea".asThingId()) shouldBe
            Unit.right()

        mongoDeviceRepository.retrieve(aDeviceId) shouldBe Device(
            aDeviceId,
            "arduino-uno".asDeviceName(),
            "http://esp32s3-654e44:8080".asDeviceHost(),
            listOf(
                Thing(
                    "8a1ea8db-fffa-4c6f-935e-39a34eba871c".asThingId(),
                    "kitchen lamp".asThingName(),
                    ThingType.LAMP,
                    ThingManagement(Status.OFF),
                    1.asIdOnDevice()
                )
            )
        ).right()

        mongoDeviceRepository.addThing(
            anotherDeviceId,
            Thing(
                id = "22173b68-71b6-4419-8cb3-f3ec90d52d79".asThingId(),
                name = "new thing".asThingName(),
                type = ThingType.LAMP,
                management = ThingManagement(Status.OFF),
                idOnDevice = 2.asIdOnDevice()
            )
        ) shouldBe Unit.right()

        mongoDeviceRepository.retrieve(anotherDeviceId) shouldBe Device(
            "10152e1b-d6d4-4536-8679-52a0446dc753".asDeviceId(),
            "arduino-uno-mega".asDeviceName(),
            "http://esp32s3-654e44:8080".asDeviceHost(),
            listOf(
                Thing(
                    "392325c0-f023-4a87-95d2-2ca041bb5627".asThingId(),
                    "kitchen lamp".asThingName(),
                    ThingType.ALARM,
                    ThingManagement(Status.OFF),
                    1.asIdOnDevice()
                ),
                Thing(
                    "22173b68-71b6-4419-8cb3-f3ec90d52d79".asThingId(),
                    "new thing".asThingName(),
                    ThingType.LAMP,
                    ThingManagement(Status.OFF),
                    2.asIdOnDevice()
                ),
            )
        ).right()
    }
}