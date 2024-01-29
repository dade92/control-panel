package domain.actions.request

import domain.ThingName
import domain.ThingType

data class AddThingRequest(
    val name: ThingName,
    val type: ThingType
)