package adapters.configuration

import adapters.client.RestSwitchClient
import domain.repository.SwitchClient
import org.springframework.boot.web.client.RestTemplateBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.Duration
import java.time.temporal.ChronoUnit

@Configuration
class ClientConfiguration {

    @Bean
    fun switchClient(restTemplateBuilder: RestTemplateBuilder): SwitchClient =
        RestSwitchClient(
            restTemplateBuilder
                .setConnectTimeout(Duration.of(3, ChronoUnit.SECONDS))
                .setReadTimeout(Duration.of(3, ChronoUnit.SECONDS))
                .build()
        )

}