package adapters.client

import arrow.core.Either
import arrow.core.left
import domain.DeviceHost
import domain.IdOnDevice
import domain.repository.SwitchClient
import domain.Status
import domain.actions.SwitchError
import org.springframework.web.client.RestOperations

class RestSwitchClient(
    private val restClient: RestOperations
) : SwitchClient {

    override fun switch(status: Status) {
        restClient.getForEntity("http://esp32s3-654e44:8080/switch/${status.name}", Unit::class.java)
    }

    override fun switch(deviceHost: DeviceHost, idOnDevice: IdOnDevice, newStatus: Status): Either<SwitchError, Unit> =
        SwitchError.MismatchStatusError.left()

}