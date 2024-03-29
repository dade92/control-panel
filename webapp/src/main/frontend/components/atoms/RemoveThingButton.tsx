import {FC} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import {Thing} from "../../logic/Types";

interface Props {
    thing: Thing
    onRemoved: () => void;
    loading: boolean
}

export const RemoveThingButton: FC<Props> = ({thing, onRemoved, loading}) =>
    <LoadingButton
        data-testid={`cancel-button-${thing.id}`}
        size="large"
        onClick={() => onRemoved()}
        loading={loading}
        color={'error'}
        startIcon={<DeleteIcon/>}
        sx={{minWidth: '0px', padding: '0px'}}
    />