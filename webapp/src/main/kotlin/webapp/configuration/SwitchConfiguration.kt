package webapp.configuration

import adapters.RestSwitchClient
import domain.actions.SwitchAction
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class SwitchConfiguration {

    @Bean
    fun switchAction(): SwitchAction {
        return SwitchAction(
            RestSwitchClient(
                RestTemplate()
            )
        )
    }

}