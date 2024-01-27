package webapp.ports

import domain.*
import domain.utils.aDevice
import domain.utils.aThing
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import java.util.UUID

class DeviceToThingResponseAdapterTest {

    private val deviceToThingResponseAdapter = DeviceToThingResponseAdapter()

    @Test
    fun `adapt correctly`() {
        val thingId1 = "c9ebf5e1-e449-4af5-ac6b-99d40ac6256b".asThingId()
        val deviceId2 = "7832718b-efc4-45cc-a166-c97ffce7761d".asDeviceId()
        val thingId2 = "db1b2a4c-2f60-4def-9a6c-217128245b8d".asThingId()
        val deviceId1 = "10152e1b-d6d4-4536-8679-52a0446dc753".asDeviceId()

        val thingName1 = "pina".asThingName()
        val thingName2 = "pina2".asThingName()

        val deviceName1 = "arduino".asDeviceName()
        val deviceName2 = "arduino2".asDeviceName()

        val devices = listOf(
            aDevice(
                deviceId = deviceId1,
                deviceName = deviceName1,
                deviceHost = "host".asDeviceHost(),
                listOf(
                    aThing(
                        thingId = thingId1,
                        thingName = thingName1,
                        thingType = ThingType.LAMP,
                        thingManagement = ThingManagement(Status.ON),
                        idOnDevice = IdOnDevice(1)
                    )
                )
            ),
            aDevice(
                deviceId = deviceId2,
                deviceName = deviceName2,
                deviceHost = "host2".asDeviceHost(),
                listOf(
                    aThing(
                        thingId = thingId2,
                        thingName = thingName2,
                        thingType = ThingType.ALARM,
                        thingManagement = ThingManagement(Status.OFF),
                        idOnDevice = IdOnDevice(1)
                    )
                )
            )
        )

        deviceToThingResponseAdapter.adapt(devices) shouldBe
            listOf(
                ThingResponse(
                    id = thingId1,
                    name = thingName1,
                    device = deviceName1,
                    deviceId = deviceId1,
                    type = ThingType.LAMP,
                    management = ThingManagement(Status.ON)
                ),
                ThingResponse(
                    id = thingId2,
                    name = thingName2,
                    device = deviceName2,
                    deviceId = deviceId2,
                    type = ThingType.ALARM,
                    management = ThingManagement(Status.OFF)
                )
            )
    }
}