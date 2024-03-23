package domain.actions

import domain.messages.ChangeStatusMessage
import domain.messages.ChangeStatusMessageBroker

class ChangeStatusAction(
    private val changeStatusMessageBroker: ChangeStatusMessageBroker
) {

    fun changeStatus(request: ChangeStatusMessage) {
        changeStatusMessageBroker.sendChangeStatusMessage(request)
    }

}