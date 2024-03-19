import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import React, {FC, useState} from "react";
import {NavigationStatus} from "../organisms/AppRouter";

interface Props {
    onNavigationChange: (index: number) => void;
}

export const Navigation: FC<Props> = ({onNavigationChange}) => {
    const [navigationIndex, setNavigationIndex] =
        useState(NavigationStatus.CONTROL_PANEL);

    return <BottomNavigation
        showLabels
        value={navigationIndex}
        onChange={(event, newValue) => {
            setNavigationIndex(newValue);
            if (newValue != navigationIndex) {
                onNavigationChange(newValue);
            }
        }}
        sx={{width: '100%', position: 'fixed', bottom: 0, left: 0, marginBottom: '24px'}}
        data-testid={'navigation'}
    >
        <BottomNavigationAction label="Control panel" icon={<AdminPanelSettingsIcon/>}/>
        <BottomNavigationAction label="Favourites" data-testid={'favourites'} icon={<FavoriteIcon/>}/>
        <BottomNavigationAction label="New stuff" data-testid={'new-stuff'} icon={<LocationOnIcon/>}/>
    </BottomNavigation>
}