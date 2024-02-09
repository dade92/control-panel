import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const RemoveThingConfirmModal: FC<Props> = ({onConfirm, onCancel}) =>
    (
        <Dialog data-testid={'confirm-modal'} open={true}>
            <DialogTitle sx={{textAlign: "center"}}>Are you sure?</DialogTitle>
            <DialogActions sx={{display: "flex", flexDirection: "row", gap: "48px", justifyContent: "space-evenly"}}
                           disableSpacing={false}>
                <Button data-testid={'no-button'} onClick={onCancel}>
                    No
                </Button>
                <Button data-testid={'confirm-button'} onClick={onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
