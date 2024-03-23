package webapp.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.SimpMessagingTemplate
import webapp.ports.ChangeStatusUseCase

@Configuration
class ChangeStatusConfiguration {

    @Bean
    fun changeStatusUseCase(template: SimpMessagingTemplate): ChangeStatusUseCase = ChangeStatusUseCase(template)


}