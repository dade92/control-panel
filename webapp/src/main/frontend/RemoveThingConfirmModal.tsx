import {FC} from "react";
import {Button, Dialog, DialogActions, DialogTitle} from "@mui/material";

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const RemoveThingConfirmModal: FC<Props> = ({onConfirm, onCancel}) =>
    (
        <Dialog data-testid={'confirm-modal'} open={true}>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogActions>
                <Button data-testid={'no-button'} onClick={onCancel}>
                    No
                </Button>
                <Button data-testid={'confirm-button'} onClick={onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
