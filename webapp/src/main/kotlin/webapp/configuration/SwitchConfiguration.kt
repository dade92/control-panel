package webapp.configuration

import domain.actions.DefaultSwitchAction
import domain.actions.SwitchAction
import domain.actions.SwitchAllOffAction
import domain.repository.DeviceRepository
import domain.client.SwitchClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration

@Configuration
class SwitchConfiguration {

    @Bean
    fun switchAction(
        switchClient: SwitchClient,
        deviceRepository: DeviceRepository
    ): SwitchAction = DefaultSwitchAction(
        switchClient,
        deviceRepository
    )

    @Bean
    fun switchOffAction(
        switchClient: SwitchClient,
        deviceRepository: DeviceRepository
    ): SwitchAllOffAction = SwitchAllOffAction(
        deviceRepository,
        switchClient
    )

}