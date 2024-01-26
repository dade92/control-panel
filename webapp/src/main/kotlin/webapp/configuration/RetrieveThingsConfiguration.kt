package webapp.configuration

import domain.actions.RetrieveDeviceAction
import domain.repository.DeviceRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class RetrieveThingsConfiguration {

    @Bean
    fun retrieveThingsAction(deviceRepository: DeviceRepository): RetrieveDeviceAction {
        return RetrieveDeviceAction(deviceRepository)
    }

}