package domain.utils

import domain.asIdOnDevice
import io.kotest.matchers.shouldBe
import org.junit.jupiter.api.Test

class IdOnDeviceRetrieverTest {

    private val idOnDeviceRetriever = IdOnDeviceRetriever()

    @Test
    fun `retrieve correctly`() {
        idOnDeviceRetriever.get(
            aDevice(
                things = listOf(aThing(idOnDevice = 1.asIdOnDevice()), aThing(idOnDevice = 2.asIdOnDevice()))
            )
        ) shouldBe 3.asIdOnDevice()
    }

    @Test
    fun `in case of empty list`() {
        idOnDeviceRetriever.get(
            aDevice(things = emptyList())
        ) shouldBe 1.asIdOnDevice()
    }
}