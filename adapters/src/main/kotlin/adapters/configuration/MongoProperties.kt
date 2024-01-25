package adapters.configuration

import org.springframework.boot.context.properties.ConfigurationProperties


@ConfigurationProperties("mongo")
class MongoProperties {

    var url: String = ""

}