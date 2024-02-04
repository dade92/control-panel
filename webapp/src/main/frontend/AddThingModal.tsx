import {FC, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    FormHelperText,
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
import LoadingButton from "@mui/lab/LoadingButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

interface Props {
    devices: Device[];
    handleClose: () => void;
    onAddThing: (deviceId: string | null, thingTpe: ThingType, thingName: string) => void;
}

export const AddThingModal: FC<Props> = ({devices, handleClose, onAddThing}) => {
    const [thingType, setThingType] = useState<ThingType>(ThingType.LAMP);
    const [thingName, setThingName] = useState<string>('');
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [textFieldError, setTextFieldError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const onConfirm = () => {
        if (thingName.length > 0) {
            setLoading(true);
            onAddThing(deviceId, thingType, thingName);
        } else {
            setTextFieldError(true);
        }
    };

    const computeDeviceName = () => {
        const result: Device[] = devices.filter((t) => t.deviceId == deviceId);
        if (result.length == 0) {
            return '';
        } else {
            return result[0].deviceName
        }
    };

    return <Dialog sx={{padding: "8px"}}
                   data-testid={'add-thing-modal'}
                   open={true} fullWidth
                   maxWidth="sm">
        <DialogTitle sx={{m: 0, p: 2}}>New thing</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            data-testid={'add-thing-close-button'}
            sx={{
                position: 'absolute',
                right: 8,
                top: 12,
                color: (theme) => theme.palette.grey[500],
            }}>
            <CloseIcon/>
        </IconButton>
        <DialogContent dividers={true}>
            <Wrapper data-testid={'add-thing-content'}>
                <FormControl>
                    <InputLabel>Device</InputLabel>
                    <Select
                        labelId="device-name-selector"
                        id="device-name-selector"
                        value={computeDeviceName()}
                        label="Device name"
                        data-testid={'device-name-selector'}
                        onChange={(e: SelectChangeEvent) =>
                            setDeviceId(devices.filter((d) => d.deviceName == e.target.value)[0]?.deviceId)}
                    >
                        <MenuItem id={'new-device'} value={''}>New device</MenuItem>
                        {
                            devices.map((d) => {
                                return <MenuItem data-testid={`selector-${d.deviceId}`} id={d.deviceId}
                                                 value={d.deviceName}>{d.deviceName}</MenuItem>
                            })
                        }
                    </Select>
                    <FormHelperText>Attach thing to an existing device, or leave this field empty for a new
                        device</FormHelperText>
                </FormControl>
                <FormControl>
                    <InputLabel>Thing type</InputLabel>
                    <Select
                        labelId="thing-type-selector"
                        id="thing-type-selector"
                        value={thingType}
                        label="Thing type"
                        data-testid={'thing-type-selector'}
                        onChange={(e: SelectChangeEvent) => setThingType(e.target.value as ThingType)}
                    >
                        {Object.keys(ThingType).map((type) => {
                            return <MenuItem id={type} value={type}>{type}</MenuItem>
                        })}
                    </Select>
                    <FormHelperText>Select the type of thing you want to add</FormHelperText>
                </FormControl>
                <TextField label="Thing name"
                           value={thingName}
                           error={textFieldError}
                           data-testid={'thing-name-form'}
                           helperText={"Thing name should be unique and not empty for every new thing"}
                           onChange={(e) => {
                               setThingName(e.target.value)
                           }}
                />
            </Wrapper>
        </DialogContent>
        <DialogActions>
            <LoadingButton data-testid={'confirm-button'} onClick={onConfirm} loading={loading}>Add</LoadingButton>
        </DialogActions>
    </Dialog>
}