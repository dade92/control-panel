package webapp.configuration

import domain.actions.RemoveThingsAction
import domain.actions.RetrieveDeviceAction
import domain.repository.DeviceRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class ActionsConfiguration {

    @Bean
    fun retrieveThingsAction(deviceRepository: DeviceRepository): RetrieveDeviceAction =
        RetrieveDeviceAction(deviceRepository)

    @Bean
    fun removeThingsAction(deviceRepository: DeviceRepository): RemoveThingsAction =
        RemoveThingsAction(deviceRepository)

}