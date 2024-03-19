import {FC, useState} from "react";
import {Button, Dialog, DialogContent, DialogTitle, IconButton, Typography} from "@mui/material";
import {Thing} from "../../logic/Types";
import CloseIcon from "@mui/icons-material/Close";
import styled from "styled-components";
import {DeviceHostTextField, InfoLabelText} from "../atoms/Texts";
import UpdateIcon from '@mui/icons-material/Update';

interface Props {
    thing: Thing;
    handleClose: () => void;
    onChangeHost: (deviceHost: string, deviceId: string) => void;
}

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

export const InfoThingModal: FC<Props> = ({thing, handleClose, onChangeHost}) => {
    const [host, setHost] = useState<string>(thing.deviceHost);

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
        <DialogContent sx={{display: "flex", flexDirection: "column", gap: "16px", paddingRight: '0px'}} dividers>
            <InfoWrapper><InfoLabelText text={'Name:'}/><Typography
                data-testid={'info-thing-name'}>{thing.name}</Typography></InfoWrapper>
            <InfoWrapper><InfoLabelText text={'Device:'}/><Typography
                data-testid={'info-thing-device'}>{thing.device}</Typography></InfoWrapper>
            <InfoWrapper><InfoLabelText text={'Device host:'}/>
                <DeviceHostTextField host={host} onChange={(newHost: string) => setHost(newHost)}/>
                <Button startIcon={<UpdateIcon/>} data-testid={'host-change-button'}
                        onClick={() => onChangeHost(host, thing.deviceId)}/></InfoWrapper>
            <InfoWrapper><InfoLabelText text={'Type:'}/><Typography
                data-testid={'info-thing-type'}>{thing.type}</Typography></InfoWrapper>
        </DialogContent>
    </Dialog>
}