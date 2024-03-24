package webapp.configuration

import domain.actions.ChangeStatusAction
import domain.repository.DeviceRepository
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.messaging.simp.SimpMessagingTemplate
import webapp.messages.WebSocketChangeStatusMessageBroker

@Configuration
class ChangeStatusConfiguration {

    @Bean
    fun changeStatusAction(
        template: SimpMessagingTemplate,
        deviceRepository: DeviceRepository
    ): ChangeStatusAction = ChangeStatusAction(
        WebSocketChangeStatusMessageBroker(template),
        deviceRepository
    )

}