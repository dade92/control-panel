import {FC} from "react";
import {Switch} from "@mui/material";

interface Props {
    isOn: boolean;
    disabled: boolean;
    onChange: () => void;
}

//TODO test it!
export const SwitchLampButton: FC<Props> = ({isOn, disabled, onChange}) =>
    <Switch checked={isOn} disabled={disabled}
            onChange={onChange}/>