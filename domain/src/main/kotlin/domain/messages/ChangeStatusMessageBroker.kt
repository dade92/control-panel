package domain.messages

interface ChangeStatusMessageBroker {
    fun sendChangeStatusMessage(request: ChangeStatusMessage)
}