import {FC, ReactElement} from "react";
import LoadingButton from "@mui/lab/LoadingButton";

interface Props {
    isLoading: boolean;
    onClick: () => void;
    icon: ReactElement;
}

export const SwitchButtonWithLoader: FC<Props> = ({isLoading, onClick, icon}) => (
    <LoadingButton
        sx={{minWidth: '40px', minHeight: '32px', padding: '0px'}}
        size="small"
        onClick={onClick}
        loading={isLoading}
        loadingPosition="center"
        startIcon={icon}
        variant="contained"
    />
)