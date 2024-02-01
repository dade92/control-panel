package domain.utils

import domain.ThingId
import domain.asThingId
import java.util.UUID

class RandomThingIdGenerator {

    fun retrieve(): ThingId = UUID.randomUUID().toString().asThingId()

}