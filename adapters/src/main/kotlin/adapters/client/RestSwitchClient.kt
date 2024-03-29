package adapters.client

import arrow.core.Either
import arrow.core.left
import arrow.core.right
import domain.DeviceHost
import domain.IdOnDevice
import domain.Status
import domain.actions.errors.ActionError
import domain.client.SwitchClient
import org.slf4j.LoggerFactory
import org.springframework.web.client.RestTemplate

class RestSwitchClient(
    private val restClient: RestTemplate
) : SwitchClient {
    private val logger = LoggerFactory.getLogger(RestSwitchClient::class.java)

    override fun switch(deviceHost: DeviceHost, idOnDevice: IdOnDevice, newStatus: Status): Either<ActionError.SwitchError, Unit> =
        try {
            restClient.getForEntity(
                deviceHost.value + "/switch/${idOnDevice}/${newStatus.name}",
                Unit::class.java
            )

            Unit.right()
        } catch (e: Exception) {
            logger.error("Error switching device $deviceHost due to ", e)
            ActionError.SwitchError.StatusNotUpdatedError.left()
        }

}