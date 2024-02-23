import {FC} from "react";
import {Fab} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface Props {
    onAddThingClicked: () => void;
}


export const AddThingButton: FC<Props> = ({onAddThingClicked}) =>
    <Fab data-testid={'add-thing-button'} onClick={onAddThingClicked} color="success" aria-label="add">
        <AddIcon/>
    </Fab>