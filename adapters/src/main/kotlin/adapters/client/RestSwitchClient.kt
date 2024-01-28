package adapters.client

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import domain.DeviceHost
import domain.IdOnDevice
import domain.Status
import domain.actions.SwitchError
import domain.repository.SwitchClient
import org.slf4j.LoggerFactory
import org.springframework.web.client.RestOperations

class RestSwitchClient(
    private val restClient: RestOperations
) : SwitchClient {

    private val logger = LoggerFactory.getLogger(RestSwitchClient::class.java)

    override fun switch(status: Status) {
        restClient.getForEntity("http://esp32s3-654e44:8080/switch/${status.name}", Unit::class.java)
    }

    override fun switch(deviceHost: DeviceHost, idOnDevice: IdOnDevice, newStatus: Status): Either<SwitchError, Unit> =
        try {
            restClient.getForEntity(
                deviceHost.value + "/switch/${idOnDevice}/${newStatus.name}",
                Unit::class.java
            )

            Unit.right()
        } catch (e: Exception) {
            logger.error("")
            SwitchError.StatusNotUpdatedError.left()
        }

}