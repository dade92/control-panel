package adapters.configuration

import adapters.client.RestSwitchClient
import domain.repository.SwitchClient
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.web.client.RestTemplate

@Configuration
class ClientConfiguration {

    //TODO configure better the RestTemplate
    @Bean
    fun switchClient(): SwitchClient = RestSwitchClient(RestTemplate())

}