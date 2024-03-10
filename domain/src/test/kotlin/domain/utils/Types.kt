package domain.utils

import domain.*

fun aDevice(
    deviceId: DeviceId = aDeviceId,
    deviceName: DeviceName = aDeviceName,
    deviceHost: DeviceHost = aDeviceHost,
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
    idOnDevice: IdOnDevice = anIdOnDevice
): Thing = Thing(
    thingId,
    thingName,
    thingType,
    thingManagement,
    idOnDevice
)

fun aThingToDevice(
    thingId: ThingId = aThingId,
    thingName: ThingName = aThingName,
    thingType: ThingType = aThingType,
    thingManagement: ThingManagement = aThingManagement,
    deviceId: DeviceId = aDeviceId,
    deviceName: DeviceName = aDeviceName,
    deviceHost: DeviceHost = aDeviceHost,
): ThingToDevice = ThingToDevice(
    thingId,
    thingName,
    thingType,
    thingManagement,
    deviceId,
    deviceName,
    deviceHost
)

val aThingId = "638a3db2-69e7-471d-90c2-f51360077ae9".asThingId()
val anotherThingId = "279e65c3-a555-4ce4-a60c-827ec0a89d17".asThingId()
val aThingName = "name".asThingName()
val anotherThingName = "another name".asThingName()
val aThingType = ThingType.LAMP
val aThingManagement = ThingManagement(Status.OFF)
val anIdOnDevice = IdOnDevice(1)
val aDeviceId = "0da34700-1ed4-4ee5-8bac-4c2ab5ddeadb".asDeviceId()
val anotherDeviceId = "10152e1b-d6d4-4536-8679-52a0446dc753".asDeviceId()
val aDeviceName = "device name".asDeviceName()
val anotherDeviceName = "another device name".asDeviceName()
val aDeviceHost = "host".asDeviceHost()
val anotherDeviceHost = "another host".asDeviceHost()
