package webapp.configuration

import domain.actions.ChangeStatusAction
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.SimpMessagingTemplate
import webapp.ports.WebSocketChangeStatusMessageBroker

@Configuration
class ChangeStatusConfiguration {

    @Bean
    fun changeStatusAction(template: SimpMessagingTemplate): ChangeStatusAction = ChangeStatusAction(
        WebSocketChangeStatusMessageBroker(template)
    )

}