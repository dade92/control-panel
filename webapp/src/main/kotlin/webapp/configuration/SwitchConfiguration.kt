package webapp.configuration

import domain.actions.FakeSwitchAction
import domain.actions.RetrieveThingsAction
import domain.actions.SwitchAction
import domain.repository.DeviceRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import webapp.ports.DeviceToThingResponseAdapter

@Configuration
class SwitchConfiguration {

    @Bean
    fun switchAction(): SwitchAction {
        return FakeSwitchAction(
//            RestSwitchClient(
//                RestTemplate()
//            )
        )
    }

}