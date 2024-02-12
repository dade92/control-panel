package webapp.configuration

import domain.actions.AddThingAction
import domain.actions.ChangeHostAction
import domain.actions.RemoveThingsAction
import domain.actions.RetrieveDeviceAction
import domain.repository.DeviceRepository
import domain.utils.DeviceNameGenerator
import domain.utils.IdOnDeviceRetriever
import domain.utils.RandomIdGenerator
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

    @Bean
    fun addThingsAction(deviceRepository: DeviceRepository): AddThingAction =
        AddThingAction(deviceRepository, RandomIdGenerator(), IdOnDeviceRetriever(), DeviceNameGenerator())

    @Bean
    fun changeHostAction(deviceRepository: DeviceRepository): ChangeHostAction = ChangeHostAction(deviceRepository)


}