import {FC} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton, TextField, Typography} from "@mui/material";
import {Thing} from "./Thing";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import {InfoLabelText} from "./Texts";

interface Props {
    thing: Thing;
    handleClose: () => void;
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`

export const InfoThingModal: FC<Props> = ({thing, handleClose}) => {
    return <Dialog data-testid={'info-modal'} open={true} fullWidth>
        <DialogTitle sx={{m: 0, p: 2}}>{thing.name}</DialogTitle>
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
        <DialogContent sx={{display: "flex", flexDirection: "column", gap: "8px"}} dividers>
            <InfoWrapper><InfoLabelText text={'Name:'}/><Typography
                data-testid={'info-thing-name'}>{thing.name}</Typography></InfoWrapper>
            <InfoWrapper><InfoLabelText text={'Device:'}/><Typography
                data-testid={'info-thing-device'}>{thing.device}</Typography></InfoWrapper>
            <InfoWrapper><InfoLabelText text={'Device host:'}/><TextField
                data-testid={'info-thing-device-host'} size="small" margin="dense" label={'host'} variant="standard"
                defaultValue={thing.deviceHost}/>
                <Button onClick={() => console.log('changing host')}>Change</Button></InfoWrapper>
            <InfoWrapper><InfoLabelText text={'Type:'}/><Typography
                data-testid={'info-thing-type'}>{thing.type}</Typography></InfoWrapper>
        </DialogContent>
    </Dialog>
}