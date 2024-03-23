import React from 'react';
import ReactDOM from 'react-dom';
import {AppRouter} from "./components/organisms/AppRouter";
import {AppRouterWithWebSocket} from "./components/organisms/AppRouterWithWebSocket";

ReactDOM.render(
    <AppRouterWithWebSocket/>,
    document.getElementById('react')
)