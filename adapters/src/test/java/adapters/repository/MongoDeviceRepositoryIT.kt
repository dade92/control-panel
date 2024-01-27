package adapters.repository

import adapters.MongoDBTestContainerConfig
import adapters.configuration.MongoConfiguration
import adapters.configuration.RepositoryConfiguration
import arrow.core.right
import domain.*
import domain.repository.DeviceRepository
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import org.testcontainers.junit.jupiter.Testcontainers
import java.util.*

@SpringBootTest(classes = [RepositoryConfiguration::class, MongoConfiguration::class, MongoDBTestContainerConfig::class])
@Testcontainers
class MongoDeviceRepositoryIT {

    @Autowired
    private lateinit var mongoDeviceRepository: DeviceRepository

    @Test
    fun `retrieve all devices`() {
        mongoDeviceRepository.retrieveAll() shouldBe listOf(
            Device(
                "c9e4c231-dbca-428f-9442-b01440f91330".asDeviceId(),
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
                "a9cc44cf-4fa0-4804-ba0c-f25ec6a63c12".asDeviceId(),
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

}