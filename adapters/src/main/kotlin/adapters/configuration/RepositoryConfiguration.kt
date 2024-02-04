package adapters.configuration

import adapters.repository.MongoDeviceRepository
import domain.repository.DeviceRepository
import domain.utils.NowProvider
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
class RepositoryConfiguration {

    @Bean
    fun deviceRepository(mongoTemplate: MongoTemplate): DeviceRepository = MongoDeviceRepository(mongoTemplate, NowProvider())

}