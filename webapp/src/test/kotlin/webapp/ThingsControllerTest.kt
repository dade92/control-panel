package webapp

import com.springexample.utils.Fixtures
import domain.actions.SwitchAction
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import webapp.ports.ThingsController

@WebMvcTest(ThingsController::class)
class ThingsControllerTest {

    @Autowired
    private lateinit var mvc: MockMvc

    @MockBean
    private lateinit var switchAction: SwitchAction

    @Test
    fun `retrieve things`() {
        mvc.perform(
            get("/api/v1/things").contentType(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk())
            .andExpect(content().json(Fixtures.readJson("/thingsResponse.json")))
    }
}
