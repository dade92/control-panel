package domain.utils

import domain.Device
import domain.DeviceHost
import domain.DeviceId
import domain.DeviceName
import domain.Status
import domain.Thing
import domain.ThingId
import domain.ThingManagement
import domain.ThingName
import domain.ThingType
import domain.asDeviceHost
import domain.asDeviceId
import domain.asDeviceName
import domain.asThingId
import domain.asThingName
import java.util.UUID

fun aDevice(
    deviceId: DeviceId = UUID.fromString("0da34700-1ed4-4ee5-8bac-4c2ab5ddeadb").asDeviceId(),
    deviceName: DeviceName = "name".asDeviceName(),
    deviceHost: DeviceHost = "host".asDeviceHost(),
    things: List<Thing> = listOf(aThing(), aThing())
): Device = Device(
    deviceId,
    deviceName,
    deviceHost,
    things
)

fun aThing(
    thingId: ThingId = UUID.fromString("638a3db2-69e7-471d-90c2-f51360077ae9").asThingId(),
    thingName: ThingName = "name".asThingName(),
    thingType: ThingType = ThingType.LAMP,
    thingManagement: ThingManagement = ThingManagement(Status.OFF),
    idOnDevice: Int = 1
): Thing = Thing(
    thingId,
    thingName,
    thingType,
    thingManagement,
    idOnDevice
)