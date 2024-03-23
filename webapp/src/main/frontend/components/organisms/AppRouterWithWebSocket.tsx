import {ChangeStatusConfigurationProvider} from "../../logic/context/ChangeStatusConfigurationProvider";
import {AppRouter} from "./AppRouter";
import React, {FC} from "react";

export const AppRouterWithWebSocket: FC = () => {
    return (
        <ChangeStatusConfigurationProvider>
            <AppRouter/>
        </ChangeStatusConfigurationProvider>
    )
}