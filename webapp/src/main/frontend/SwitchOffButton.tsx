import {Fab} from "@mui/material";
import {FC} from "react";
import AdjustIcon from '@mui/icons-material/Adjust';

interface Props {
    onSwitchOffClicked: () => void;
}

export const SwitchOffButton: FC<Props> = ({onSwitchOffClicked}) =>
    <Fab data-testid={'switch-off-button'} onClick={onSwitchOffClicked} color="error" aria-label="switch-off">
        <AdjustIcon/>
    </Fab>