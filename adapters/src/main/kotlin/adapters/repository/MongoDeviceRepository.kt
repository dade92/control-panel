package adapters.repository

import arrow.core.Either
import arrow.core.right
import domain.Device
import domain.DeviceId
import domain.repository.DeviceRepository
import domain.repository.RetrieveError
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query

private val COLLECTION_NAME = "device"

class MongoDeviceRepository(
    private val mongoTemplate: MongoTemplate
): DeviceRepository {
    override fun retrieve(deviceId: DeviceId): Either<RetrieveError, Device> {
        val query = Query.query(Criteria.where("deviceId").`is`(deviceId.value))

        return mongoTemplate.find(query, Device::class.java, COLLECTION_NAME)[0].right()
    }
}