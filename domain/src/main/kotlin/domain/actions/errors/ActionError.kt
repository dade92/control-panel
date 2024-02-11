package domain.actions.errors

sealed class ActionError {

    sealed class AddError: ActionError() {
        object AddThingError: AddError()

        object AddDeviceError: AddError()

    }

    sealed class SwitchError: ActionError() {
        object DeviceNotAvailable : SwitchError()
        object DeviceNotFound : SwitchError()
        object ThingNotFound : SwitchError()
        object StatusAlreadySwitchedError : SwitchError()
        object StatusNotUpdatedError : SwitchError()
    }

    sealed class RetrieveError: ActionError() {
        object DeviceRetrieveError : RetrieveError()
        object DeviceRemoveError : RetrieveError()
    }

    sealed class UpdateError: ActionError() {
        object UpdateDeviceHostError: UpdateError()
    }

}