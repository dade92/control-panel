package adapters.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("mongo")
public class MongoProperties {

    public String url;

    public void setUrl(String url) {
        this.url = url;
    }
}
