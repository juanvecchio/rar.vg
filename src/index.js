import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import {Home} from './pages/home'
import {AppError} from './pages/error'
import {RouterProvider} from './router/router';
import {Route} from './router/route';
import Profile from "./pages/profile";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";

// Get the subdomain.
const host = window.location.host.split('.')

export const WebRoutes = [
    {
        path: "/",
        component: <Home/>
    },
    {
        path: "/login",
        component: <Login/>
    },
    {
        path: "/dashboard",
        component: <Dashboard/>
    },
    {
        path: "",
        component: <AppError></AppError>,
        status: 404
    }

]

const AppRoutes = () => <RouterProvider>
    {WebRoutes.map((route, k) => <Route key={k} status={route.status ? route.status : 200}
                                        path={route.path}>{route.component}</Route>)}
</RouterProvider>


if (host.length === 2)
{
    const subdomain = host[0]
    ReactDOM.render(<Profile username={subdomain}/>, document.getElementById('root'))
}
else
{
    ReactDOM.render(
        <AppRoutes></AppRoutes>,
        document.getElementById("root")
    );
}

export default AppRoutes;