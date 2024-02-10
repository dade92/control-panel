import {FC} from "react";
import {Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {Thing} from "./Thing";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";

interface Props {
    thing: Thing;
    handleClose: () => void;
}

export const InfoThingModal: FC<Props> = ({thing, handleClose}) => {
    return <Dialog data-testid={'info-modal'} open={true} fullWidth>
        <DialogTitle sx={{m: 0, p: 2}}>Info about thing {thing.name}</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            data-testid={'info-thing-close-button'}
            sx={{
                position: 'absolute',
                right: 8,
                top: 12,
                color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon/>
        </IconButton>
        <DialogContent sx={{display: "flex", flexDirection: "column", gap: "8px"}}>
            <Typography>{thing.name}</Typography>
            <Typography>{thing.device}</Typography>
            <Typography>{thing.type}</Typography>
        </DialogContent>
    </Dialog>
}