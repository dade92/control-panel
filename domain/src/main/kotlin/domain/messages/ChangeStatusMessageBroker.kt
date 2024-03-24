package domain.messages

interface ChangeStatusMessageBroker {
    fun sendChangeStatusMessage(message: ChangeStatusMessage)
}