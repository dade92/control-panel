package adapters

import domain.repository.SwitchClient
import domain.Status
import org.springframework.web.client.RestOperations

class RestSwitchClient(
    private val restClient: RestOperations
): SwitchClient {

    override fun switch(status: Status) {
        restClient.getForEntity("http://esp32s3-654e44:8080/switch/${status.name}", Unit::class.java)
    }

}