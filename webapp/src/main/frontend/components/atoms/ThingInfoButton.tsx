import {FC} from "react";
import {Button} from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import {Thing} from "../../logic/Types";

interface Props {
    onClick: () => void;
    thing: Thing;
}

export const ThingInfoButton: FC<Props> = ({onClick, thing}) =>
    <Button data-testid={`info-button-${thing.id}`} onClick={onClick} startIcon={<InfoIcon htmlColor={'#2e7d32'}/>}
            sx={{minWidth: '0px', padding: '0px'}}/>