package adapters.repository

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import domain.Device
import domain.DeviceId
import domain.Status
import domain.repository.DeviceRepository
import domain.repository.RetrieveError
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query

private val COLLECTION_NAME = "device"

class MongoDeviceRepository(
    private val mongoTemplate: MongoTemplate
) : DeviceRepository {

    private val logger = LoggerFactory.getLogger(MongoDeviceRepository::class.java)

    override fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device> {
        val query = Query.query(Criteria.where("deviceId").`is`(deviceId.value))

        return mongoTemplate.find(query, Device::class.java, COLLECTION_NAME)[0].right()
    }

    override fun retrieveAll(): Either<RetrieveError, List<Device>> =
        try {
            mongoTemplate.find(Query(), Device::class.java, COLLECTION_NAME).right()
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

}

data class MongoThing(
    val id: String,
    val name: String,
    val type: String,
    val management: MongoThing.Management,
    val idOnDevice: Int
) {
    data class Management(
        val switch: Status
    )

}