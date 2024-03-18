import {FC} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import {Thing} from "../../logic/Thing";

interface Props {
    thing: Thing;
    onConfirm: () => void;
    onCancel: () => void;
}

export const RemoveThingConfirmModal: FC<Props> = ({thing, onConfirm, onCancel}) =>
    (
        <Dialog data-testid={'confirm-modal'} open={true}>
            <DialogTitle data-testid={'remove-modal-title'} sx={{textAlign: "center"}}>You are
                removing {thing.name}</DialogTitle>
            <DialogContent dividers={true}>
                <Typography>
                    This action can't be undone. You can re add things using the add thing button
                </Typography>
            </DialogContent>
            <DialogActions sx={{display: "flex", flexDirection: "row", gap: "48px", justifyContent: "space-evenly"}}>
                <Button data-testid={'no-button'} onClick={onCancel}>
                    No
                </Button>
                <Button data-testid={'confirm-button'} onClick={onConfirm}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
