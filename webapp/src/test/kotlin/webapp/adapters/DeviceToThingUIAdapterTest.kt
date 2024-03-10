package webapp.adapters

import domain.*
import domain.utils.*
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test
import webapp.ports.DeviceToThingResponseAdapter
import webapp.ports.ThingUI

class DeviceToThingUIAdapterTest {

    private val deviceToThingResponseAdapter = DeviceToThingResponseAdapter()

    @Test
    fun `adapt correctly`() {
        val devices = listOf(
            aDevice(
                deviceId = anotherDeviceId,
                deviceName = aDeviceName,
                deviceHost = aDeviceHost,
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
                deviceHost = anotherDeviceHost,
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
                ThingUI(
                    id = aThingId,
                    name = aThingName,
                    device = aDeviceName,
                    deviceId = anotherDeviceId,
                    deviceHost = aDeviceHost,
                    type = ThingType.LAMP,
                    management = ThingManagement(Status.ON)
                ),
                ThingUI(
                    id = anotherThingId,
                    name = anotherThingName,
                    device = anotherDeviceName,
                    deviceId = aDeviceId,
                    deviceHost = anotherDeviceHost,
                    type = ThingType.ALARM,
                    management = ThingManagement(Status.OFF)
                )
            )
    }
}