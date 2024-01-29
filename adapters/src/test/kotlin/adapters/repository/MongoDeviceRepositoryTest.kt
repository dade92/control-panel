package adapters.repository

import adapters.configuration.MongoConfiguration
import adapters.configuration.RepositoryConfiguration
import arrow.core.right
import domain.*
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
    fun `remove a thing`() {
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
    }
}