import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmModal: FC<Props> = ({onConfirm, onCancel}) => {

    return (
        <Dialog open={true}>
            <DialogTitle>Phone Ringtone</DialogTitle>
            <DialogContent dividers>
                <span>Are you sure?</span>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={onCancel}>
                    No
                </Button>
                <Button onClick={onConfirm}>Yes. Remove it!</Button>
            </DialogActions>
        </Dialog>
    )

}
