package domain.actions.request

import domain.DeviceId
import domain.ThingName
import domain.ThingType

data class AddThingRequest(
    val deviceId: DeviceId?,
    val name: ThingName,
    val type: ThingType
)