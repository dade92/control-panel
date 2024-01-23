import {FC} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import {Thing} from "./Thing";

interface Props {
    thing: Thing
    onRemoved: (thing: Thing) => void;
}

export const RemoveThingButton: FC<Props> = ({thing, onRemoved}) =>
    <LoadingButton
        data-testid={`cancel-button-${thing.id}`}
        size="large"
        onClick={() => onRemoved(thing)}
        loading={false}
        color={'error'}
        startIcon={<DeleteIcon/>}
    />