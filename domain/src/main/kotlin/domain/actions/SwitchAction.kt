package domain.actions

import domain.SwitchClient
import domain.thing.Status

class SwitchAction(
    private val switchClient: SwitchClient
) {

    fun switch(status: Status) {
        switchClient.switch(status)
    }

}