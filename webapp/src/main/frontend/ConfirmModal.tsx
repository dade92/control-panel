import {FC} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal: FC<Props> = ({onConfirm, onCancel}) => {

    return (
        <Dialog data-testid={'confirm-modal'} open={true}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogActions>
                <Button autoFocus onClick={onCancel}>
                    No
                </Button>
                <Button data-testid={'confirm-button'} onClick={onConfirm}>Yes. Remove it!</Button>
            </DialogActions>
        </Dialog>
    )

}
