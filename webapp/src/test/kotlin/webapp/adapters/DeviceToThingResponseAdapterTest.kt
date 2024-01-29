package webapp.adapters

import domain.*
import domain.utils.aDevice
import domain.utils.aDeviceId
import domain.utils.aDeviceName
import domain.utils.aThing
import domain.utils.aThingId
import domain.utils.aThingName
import domain.utils.anotherDeviceId
import domain.utils.anotherDeviceName
import domain.utils.anotherThingId
import domain.utils.anotherThingName
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import webapp.ports.DeviceToThingResponseAdapter
import webapp.ports.ThingResponse

class DeviceToThingResponseAdapterTest {

    private val deviceToThingResponseAdapter = DeviceToThingResponseAdapter()

    @Test
    fun `adapt correctly`() {
        val devices = listOf(
            aDevice(
                deviceId = anotherDeviceId,
                deviceName = aDeviceName,
                deviceHost = "host".asDeviceHost(),
                listOf(
                    aThing(
                        thingId = aThingId,
                        thingName = aThingName,
                        thingType = ThingType.LAMP,
                        thingManagement = ThingManagement(Status.ON),
                        idOnDevice = IdOnDevice(1)
                    )
                )
            ),
            aDevice(
                deviceId = aDeviceId,
                deviceName = anotherDeviceName,
                deviceHost = "host2".asDeviceHost(),
                listOf(
                    aThing(
                        thingId = anotherThingId,
                        thingName = anotherThingName,
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
                    id = aThingId,
                    name = aThingName,
                    device = aDeviceName,
                    deviceId = anotherDeviceId,
                    type = ThingType.LAMP,
                    management = ThingManagement(Status.ON)
                ),
                ThingResponse(
                    id = anotherThingId,
                    name = anotherThingName,
                    device = anotherDeviceName,
                    deviceId = aDeviceId,
                    type = ThingType.ALARM,
                    management = ThingManagement(Status.OFF)
                )
            )
    }
}