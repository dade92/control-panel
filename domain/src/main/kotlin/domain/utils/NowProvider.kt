package domain.utils

import java.time.LocalDateTime

class NowProvider {
    fun get():LocalDateTime = LocalDateTime.now()
}