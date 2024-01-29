package adapters.configuration

import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.client.MongoClient
import com.mongodb.client.MongoClients
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate


@Configuration
@EnableConfigurationProperties(MongoProperties::class)
class MongoConfiguration {

    @Bean
    fun mongoClient(mongoProperties: MongoProperties): MongoClient {
        val connectionString = ConnectionString(mongoProperties.url)
        val mongoClientSettings = MongoClientSettings.builder()
            .applyConnectionString(connectionString)
            .build()
        return MongoClients.create(mongoClientSettings)
    }

    @Bean
    fun mongoTemplate(mongoClient: MongoClient?, mongoProperties: MongoProperties): MongoTemplate =
        MongoTemplate(mongoClient!!, mongoProperties.database)
}
