import {FC, ReactElement} from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
    isLoading: boolean;
    onChange: () => void;
    icon: ReactElement;
}

export const SwitchButtonWithLoader: FC<Props> = ({isLoading, onChange, icon}) => (
    <LoadingButton
        size="small"
        onClick={onChange}
        loading={isLoading}
        loadingPosition="center"
        startIcon={icon}
        variant="contained"
    />
)