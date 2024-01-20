package webapp

import domain.TranslationsProvider
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RestController

@RestController
class TranslationsResource(
    private val translationsProvider: TranslationsProvider
): BaseApiController() {

    @GetMapping("/translations/{language}")
    fun translations(
        @PathVariable language: String
    ): ResponseEntity<TranslationsResponse> =
        ResponseEntity.ok(
            TranslationsResponse(
                translations = translationsProvider.retrieve(language).data
            )
        )
}

data class TranslationsResponse(
    val translations: Map<String, String>
)