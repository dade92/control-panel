import {FC} from "react";
import {Switch} from "@mui/material";

interface Props {
    isOn: boolean;
    disabled: boolean;
    onClick: () => void;
}

export const SwitchLampButton: FC<Props> = ({isOn, disabled, onClick}) =>
    <Switch data-testid={'switch-lamp'} checked={isOn} disabled={disabled}
            onChange={onClick}/>