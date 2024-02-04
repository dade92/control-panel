package domain.utils

import domain.DeviceId
import domain.ThingId
import domain.asDeviceId
import domain.asThingId
import java.util.UUID

class RandomThingIdGenerator {

    fun retrieveThingId(): ThingId = UUID.randomUUID().toString().asThingId()
    fun retrieveDeviceId(): DeviceId = UUID.randomUUID().toString().asDeviceId()

}