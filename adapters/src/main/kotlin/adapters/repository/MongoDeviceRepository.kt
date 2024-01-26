package adapters.repository

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import domain.*
import domain.repository.DeviceRepository
import domain.repository.RetrieveError
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import java.util.*

private val COLLECTION_NAME = "device"

class MongoDeviceRepository(
    private val mongoTemplate: MongoTemplate
) : DeviceRepository {

    private val logger = LoggerFactory.getLogger(MongoDeviceRepository::class.java)

    override fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device> =
        try {
            val query = Query.query(Criteria.where("deviceId").`is`(deviceId.value))

            mongoTemplate.find(query, MongoDevice::class.java, COLLECTION_NAME)[0].toDomain().right()
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
}

data class MongoDevice(
    val id: String,
    val deviceName: String,
    val host: String,
    val things: List<MongoThing>
) {
    fun toDomain(): Device = Device(
        deviceId = UUID.fromString(id).asDeviceId(),
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
            id = UUID.fromString(id).asThingId(),
            name = name.asThingName(),
            type = ThingType.valueOf(type),
            management = ThingManagement(management.switch),
            idOnDevice = idOnDevice.asIdOnDevice()
        )
    }

}