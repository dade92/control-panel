package adapters.repository

import org.springframework.context.annotation.Configuration
import org.testcontainers.containers.GenericContainer
import org.testcontainers.junit.jupiter.Container
import org.testcontainers.utility.DockerImageName
import org.testcontainers.utility.MountableFile

@Configuration
class MongoDBTestContainerConfig {
    @Container
    val mongoDBContainer: GenericContainer<*> = GenericContainer(
        DockerImageName.parse("mongo:4.4.18")
    )
        .withEnv("MONGO_INITDB_ROOT_USERNAME", "root")
        .withEnv("MONGO_INITDB_ROOT_PASSWORD", "password")
        .withExposedPorts(27017)
        .withCopyFileToContainer(
            MountableFile.forClasspathResource("./init.js"),
            "/docker-entrypoint-initdb.d/init-script.js"
        )

    init {
        mongoDBContainer.start()
        val mappedPort = mongoDBContainer.getMappedPort(27017)
        System.setProperty("mongo.url", "mongodb://root:password@localhost:$mappedPort/?authSource=admin")
    }
}
