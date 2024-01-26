package webapp.configuration

import domain.actions.DefaultSwitchAction
import domain.actions.FakeSwitchAction
import domain.actions.SwitchAction
import domain.repository.DeviceRepository
import domain.repository.SwitchClient
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
    fun fakeSwitchAction(): SwitchAction {
        return FakeSwitchAction(
//            RestSwitchClient(
//                RestTemplate()
//            )
        )
    }

}