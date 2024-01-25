package webapp.configuration

import domain.actions.FakeSwitchAction
import domain.actions.SwitchAction
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import webapp.ports.DeviceToThingResponseAdapter

@Configuration
class SwitchConfiguration {

    @Bean
    fun deviceToThingResponseAdapter(): DeviceToThingResponseAdapter = DeviceToThingResponseAdapter()

    @Bean
    fun switchAction(): SwitchAction {
        return FakeSwitchAction(
//            RestSwitchClient(
//                RestTemplate()
//            )
        )
    }

}