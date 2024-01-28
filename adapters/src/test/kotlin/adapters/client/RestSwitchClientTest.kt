package adapters.client

import arrow.core.left
import arrow.core.right
import com.github.tomakehurst.wiremock.client.WireMock
import com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import com.github.tomakehurst.wiremock.junit5.WireMockExtension
import domain.Status
import domain.actions.SwitchError
import domain.asDeviceHost
import domain.asIdOnDevice
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.RegisterExtension
import org.springframework.web.client.RestTemplate

class RestSwitchClientTest {

    @RegisterExtension
    @JvmField
    var wiremock: WireMockExtension = WireMockExtension.newInstance()
        .options(wireMockConfig().dynamicPort().dynamicHttpsPort())
        .build()


    private val restSwitchClient = RestSwitchClient(RestTemplate())

    private var host = ""

    @BeforeEach
    fun setUp() {
        host = "http://localhost:" + wiremock.runtimeInfo.httpPort
    }

    @Test
    fun `switch on successfully`() {
        wiremock.stubFor(
            WireMock.get(WireMock.urlEqualTo("/switch/1/ON"))
                .willReturn(WireMock.noContent())
        )

        restSwitchClient.switch(
            host.asDeviceHost(),
            1.asIdOnDevice(),
            Status.ON
        ) shouldBe Unit.right()
    }

    @Test
    fun `switch fails`() {
        wiremock.stubFor(
            WireMock.get(WireMock.urlEqualTo("/switch/2/ON"))
                .willReturn(WireMock.serverError())
        )

        restSwitchClient.switch(
            host.asDeviceHost(),
            2.asIdOnDevice(),
            Status.ON
        ) shouldBe SwitchError.StatusNotUpdatedError.left()
    }
}