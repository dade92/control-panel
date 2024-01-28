package adapters.repository

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import com.mongodb.BasicDBObject
import domain.*
import domain.actions.SwitchError
import domain.repository.DeviceRepository
import domain.repository.RetrieveError
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update


private val COLLECTION_NAME = "device"

class MongoDeviceRepository(
    private val mongoTemplate: MongoTemplate
) : DeviceRepository {

    private val logger = LoggerFactory.getLogger(MongoDeviceRepository::class.java)

    override fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device> =
        try {
            mongoTemplate.findById(
                deviceId.value.toString(),
                MongoDevice::class.java,
                COLLECTION_NAME
            )!!.toDomain().right()
        } catch (e: Exception) {
            logger.error("Error retrieving device $deviceId due to ", e)
            RetrieveError.DeviceRetrieveError.left()
        }

    override fun retrieveAll(): Either<RetrieveError, List<Device>> =
        try {
            mongoTemplate
                .find(Query(), MongoDevice::class.java, COLLECTION_NAME)
                .map { it.toDomain() }
                .right()
        } catch (e: Exception) {
            logger.error("Error retrieving thing list due to ", e)
            RetrieveError.DeviceRetrieveError.left()
        }

    override fun updateStatus(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit> =
        try {
            val query = Query(
                Criteria.where("_id").`is`(deviceId.value.toString())
                    .and("things._id").`is`(thingId.value.toString())
            )

            val update = Update().set("things.$.management", ThingManagement(newStatus))

            mongoTemplate.updateFirst(query, update, COLLECTION_NAME)

            Unit.right()
        } catch (e: Exception) {
            logger.error("Error updating thing status due to ", e)
            SwitchError.DeviceNotFound.left()
        }

    override fun removeThing(deviceId: DeviceId, thingId: ThingId): Either<RetrieveError, Unit> =
        try {
            val query = Query(Criteria.where("_id").`is`(deviceId.value.toString()))

            val update = Update().pull("things", BasicDBObject("_id", thingId.value.toString()))

            // Perform the update
            mongoTemplate.updateFirst(query, update, COLLECTION_NAME)
            Unit.right()
        } catch (e: Exception) {
            logger.error("Error removing thing ${thingId} from device ${deviceId} due to ", e)
            RetrieveError.DeviceRemoveError.left()
        }
}

data class MongoDevice(
    val id: String,
    val deviceName: String,
    val host: String,
    val things: List<MongoThing>
) {
    fun toDomain(): Device = Device(
        deviceId = id.asDeviceId(),
        deviceName = deviceName.asDeviceName(),
        host = host.asDeviceHost(),
        things = things.map { it.toDomain() }
    )
}

data class MongoThing(
    val id: String,
    val name: String,
    val type: String,
    val management: Management,
    val idOnDevice: Int
) {
    data class Management(
        val switch: Status
    )

    fun toDomain(): Thing {
        return Thing(
            id = id.asThingId(),
            name = name.asThingName(),
            type = ThingType.valueOf(type),
            management = ThingManagement(management.switch),
            idOnDevice = idOnDevice.asIdOnDevice()
        )
    }

}