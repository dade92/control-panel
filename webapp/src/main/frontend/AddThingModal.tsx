import {FC, useState} from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import {Device, ThingType} from "./Thing";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

interface Props {
    devices: Device[];
    handleClose: () => void;
    onAddThing: (deviceId: string | null, thingTpe: ThingType, thingName: string) => void;
}

export const AddThingModal: FC<Props> = ({devices, handleClose, onAddThing}) => {
    const [thingType, setThingType] = useState<ThingType>(ThingType.LAMP);
    const [thingName, setThingName] = useState<string>('');
    const [deviceId, setDeviceId] = useState<string | null>(null);

    const onConfirm = () => {
        if (thingName.length > 0) {
            onAddThing(deviceId, thingType, thingName);
        } else {
            console.log('name must be inserted!');
        }
    };

    const computeDeviceName = () => {
        const result: Device[] = devices.filter((t) => t.deviceId == deviceId);
        if (result.length == 0) {
            return 'New device';
        } else {
            return devices[0].deviceName
        }
    };

    return <Dialog sx={{padding: "8px"}} data-testid={'add-thing-modal'} open={true}>
        <DialogTitle sx={{m: 0, p: 2}}>Add a thing</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
                position: 'absolute',
                right: 8,
                top: 12,
                color: (theme) => theme.palette.grey[500],
            }}
        >
            <CloseIcon/>
        </IconButton>
        <DialogContent dividers={true}>
            <Wrapper>
                <FormControl fullWidth>
                    <InputLabel>Device</InputLabel>
                    <Select
                        labelId="device-name-selector"
                        id="device-name-selector"
                        defaultOpen={false}
                        value={computeDeviceName()}
                        label="Device name"
                        onChange={(e: SelectChangeEvent) =>
                            setDeviceId(devices.filter((d) => d.deviceName == e.target.value)[0]?.deviceId)}
                    >
                        <MenuItem id={'new-device'} value={''}>New device</MenuItem>
                        {
                            devices.map((d) => {
                                return <MenuItem id={d.deviceId} value={d.deviceName}>{d.deviceName}</MenuItem>
                            })
                        }
                    </Select>
                </FormControl>
                <FormControl fullWidth>
                    <InputLabel>Thing type</InputLabel>
                    <Select
                        labelId="thing-type-selector"
                        id="thing-type-selector"
                        value={thingType}
                        defaultOpen={false}
                        label="Thing type"
                        onChange={(e: SelectChangeEvent) => setThingType(e.target.value as ThingType)}
                    >
                        <MenuItem value={'LAMP'}>LAMP</MenuItem>
                        <MenuItem value={'ALARM'}>ALARM</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Thing name" value={thingName}
                           onChange={(e) => setThingName(e.target.value)}
                />
            </Wrapper>
        </DialogContent>
        <DialogActions>
            <Button data-testid={'confirm-button'} onClick={onConfirm}>Add</Button>
        </DialogActions>
    </Dialog>
}