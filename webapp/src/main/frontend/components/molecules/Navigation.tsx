import {BottomNavigation, BottomNavigationAction, BottomNavigationProps} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, {FC, useState} from "react";

interface Props {
    onNavigationChange: (index: number) => void;
}

export const Navigation: FC<Props> = ({onNavigationChange}) => {
    const [navigationIndex, setNavigationIndex] = useState(0);

    return <BottomNavigation
        showLabels
        value={navigationIndex}
        onChange={(event, newValue) => {
            setNavigationIndex(newValue);
            onNavigationChange(newValue);
        }}
        sx={{width: '100%', position: 'fixed', bottom: 0, marginBottom: '24px'}}
    >
        <BottomNavigationAction label="Control panel" icon={<AdminPanelSettingsIcon/>}/>
        <BottomNavigationAction label="Configuration" icon={<FavoriteIcon/>}/>
        <BottomNavigationAction label="New stuff" icon={<LocationOnIcon/>}/>
    </BottomNavigation>
}