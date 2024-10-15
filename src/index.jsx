import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from "react-redux";
import Router from "./router/index.jsx";
import store from "./app/store";


const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <Provider store={store}>
            <Router />
        </Provider>
    </StrictMode>
);
