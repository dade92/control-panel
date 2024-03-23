import {FC} from "react";
import {Switch} from "@mui/material";

interface Props {
    isOn: boolean;
    disabled: boolean;
    onChange: () => void;
}

export const SwitchLampButton: FC<Props> = ({isOn, disabled, onChange}) =>
    <Switch data-testid={'switch-lamp'} checked={isOn} disabled={disabled}
            onChange={onChange}/>