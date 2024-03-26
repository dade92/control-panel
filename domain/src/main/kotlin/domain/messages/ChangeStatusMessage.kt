package domain.messages

import domain.DeviceId
import domain.Status
import domain.ThingId

data class ChangeStatusMessage(
    val deviceId: DeviceId,
    val thingId: ThingId,
    val newStatus: Status
)