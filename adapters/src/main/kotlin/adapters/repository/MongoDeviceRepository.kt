package adapters.repository

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import com.mongodb.BasicDBObject
import domain.Device
import domain.DeviceId
import domain.Status
import domain.Thing
import domain.ThingId
import domain.ThingManagement
import domain.ThingType
import domain.actions.errors.ActionError.AddError
import domain.actions.errors.ActionError.RetrieveError
import domain.actions.errors.ActionError.SwitchError
import domain.asDeviceHost
import domain.asDeviceId
import domain.asDeviceName
import domain.asIdOnDevice
import domain.asThingId
import domain.asThingName
import domain.repository.DeviceRepository
import domain.utils.NowProvider
import org.slf4j.LoggerFactory
import org.springframework.data.mongodb.core.MongoTemplate
import org.springframework.data.mongodb.core.query.Criteria
import org.springframework.data.mongodb.core.query.Query
import org.springframework.data.mongodb.core.query.Update
import java.time.LocalDateTime
import java.time.ZoneId
import java.time.ZonedDateTime
import java.time.temporal.ChronoUnit
import java.time.temporal.TemporalUnit


private val COLLECTION_NAME = "device"

class MongoDeviceRepository(
    private val mongoTemplate: MongoTemplate,
    private val nowProvider: NowProvider
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

    override fun updateThingStatus(deviceId: DeviceId, thingId: ThingId, newStatus: Status): Either<SwitchError, Unit> =
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

            mongoTemplate.updateFirst(query, update, COLLECTION_NAME)

            Unit.right()
        } catch (e: Exception) {
            logger.error("Error removing thing $thingId from device $deviceId due to ", e)
            RetrieveError.DeviceRemoveError.left()
        }

    override fun addThing(deviceId: DeviceId, thing: Thing): Either<AddError.AddThingError, Unit> =
        try {
            val query = Query.query(Criteria.where("_id").`is`(deviceId.value.toString()))

            val update = Update().push("things", thing.toMongoThing())

            mongoTemplate.updateFirst(
                query, update, MongoDevice::class.java, COLLECTION_NAME
            )
            Unit.right()
        } catch (e: Exception) {
            logger.error("Error adding the thing ${thing.id} due to ", e)
            AddError.AddThingError.left()
        }

    override fun addDevice(device: Device): Either<AddError, Unit> {
        return try {
            mongoTemplate.insert(device.toMongoDevice(nowProvider.get()), COLLECTION_NAME)
            Unit.right()
        } catch (e: Exception) {
            logger.error("Error inserting device ${device.deviceId}", e)
            AddError.AddDeviceError.left()
        }
    }
}

private fun Thing.toMongoThing(): MongoThing = MongoThing(
    this.id.value.toString(),
    this.name.value,
    this.type.name,
    MongoThing.Management(this.management.switch),
    this.idOnDevice.value
)

private fun Device.toMongoDevice(creationDate: LocalDateTime): MongoDevice = MongoDevice(
    this.deviceId.value.toString(),
    this.deviceName.value,
    this.host.value,
    this.things.map { it.toMongoThing() },
    creationDate.truncatedTo(ChronoUnit.SECONDS).toString()
)


data class MongoDevice(
    val id: String,
    val deviceName: String,
    val host: String,
    val things: List<MongoThing>,
    val creationDate: String
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