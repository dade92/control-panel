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
    deviceId: DeviceId = aDeviceId,
    deviceName: DeviceName = aDeviceName,
    deviceHost: DeviceHost = asDeviceHost,
    things: List<Thing> = listOf(aThing(), aThing())
): Device = Device(
    deviceId,
    deviceName,
    deviceHost,
    things
)

fun aThing(
    thingId: ThingId = aThingId,
    thingName: ThingName = aThingName,
    thingType: ThingType = aThingType,
    thingManagement: ThingManagement = aThingManagement,
    idOnDevice: Int = anIdOnDevice
): Thing = Thing(
    thingId,
    thingName,
    thingType,
    thingManagement,
    idOnDevice
)

val aThingId = UUID.fromString("638a3db2-69e7-471d-90c2-f51360077ae9").asThingId()
val aThingName = "name".asThingName()
val aThingType = ThingType.LAMP
val aThingManagement = ThingManagement(Status.OFF)
val anIdOnDevice = 1
val aDeviceId = UUID.fromString("0da34700-1ed4-4ee5-8bac-4c2ab5ddeadb").asDeviceId()
val aDeviceName = "name".asDeviceName()
val asDeviceHost = "host".asDeviceHost()
