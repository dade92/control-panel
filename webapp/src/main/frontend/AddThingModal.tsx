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
import {ThingType} from "./Thing";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

interface Props {
    handleClose: () => void;
    onAddThing: (thingTpe: ThingType, thingName: string) => void;
}

export const AddThingModal: FC<Props> = ({handleClose, onAddThing}) => {
    const [thingType, setThingType] = useState<ThingType>(ThingType.LAMP);
    const [thingName, setThingName] = useState<string>('');

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
                    <InputLabel id="demo-simple-select-label">Thing type</InputLabel>
                    <Select
                        labelId="thing-type-selector"
                        id="thing-type-selector"
                        value={thingType}
                        defaultOpen={false}
                        label="Thing type"
                        onChange={(e: SelectChangeEvent) => setThingType(e.target.value as ThingType)}
                    >
                        <MenuItem value={'LAMP'}> LAMP</MenuItem>
                        <MenuItem value={'ALARM'}>ALARM</MenuItem>
                    </Select>
                </FormControl>
                <TextField label="Thing name" value={thingName}
                           onChange={(e) => setThingName(e.target.value)}
                />
            </Wrapper>
        </DialogContent>
        <DialogActions>
            <Button data-testid={'confirm-button'} onClick={() => onAddThing(thingType, thingName)}>Add</Button>
        </DialogActions>
    </Dialog>
}