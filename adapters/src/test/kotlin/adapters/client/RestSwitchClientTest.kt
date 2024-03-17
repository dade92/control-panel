package adapters.client

import arrow.core.left
import arrow.core.right
import com.github.tomakehurst.wiremock.client.WireMock.*
import com.github.tomakehurst.wiremock.core.WireMockConfiguration.wireMockConfig
import com.github.tomakehurst.wiremock.junit5.WireMockExtension
import domain.Status
import domain.actions.errors.ActionError.SwitchError
import domain.asDeviceHost
import domain.asIdOnDevice
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.extension.RegisterExtension
import org.springframework.web.client.RestTemplate

class RestSwitchClientTest {

    private val restSwitchClient = RestSwitchClient(RestTemplate())

    private var deviceHost = ""

    @BeforeEach
    fun setUp() {
        deviceHost = "http://localhost:" + wiremock.runtimeInfo.httpPort
    }

    @Test
    fun `switch on successfully`() {
        wiremock.stubFor(
            get(urlEqualTo("/switch/1/ON"))
                .willReturn(noContent())
        )

        restSwitchClient.switch(
            deviceHost.asDeviceHost(),
            1.asIdOnDevice(),
            Status.ON
        ) shouldBe Unit.right()
    }

    @Test
    fun `switch fails`() {
        wiremock.stubFor(
            get(urlEqualTo("/switch/2/ON"))
                .willReturn(serverError())
        )

        restSwitchClient.switch(
            deviceHost.asDeviceHost(),
            2.asIdOnDevice(),
            Status.ON
        ) shouldBe SwitchError.StatusNotUpdatedError.left()
    }

    companion object {
        @RegisterExtension
        @JvmField
        var wiremock: WireMockExtension = WireMockExtension.newInstance()
            .options(wireMockConfig().dynamicPort().dynamicHttpsPort())
            .build()
    }
}