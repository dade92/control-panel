package domain.actions

import domain.repository.SwitchClient
import domain.Status

interface SwitchAction {
    fun switch(status: Status)
}


class FakeSwitchAction: SwitchAction {
    override fun switch(status: Status) {
        Thread.sleep(1000)
    }
}

class DefaultSwitchAction(
    private val switchClient: SwitchClient
): SwitchAction {

    override fun switch(status: Status) {
        switchClient.switch(status)
    }

}