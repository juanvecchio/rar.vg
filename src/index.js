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
import Register from "./pages/register";
import ChangePassword from './pages/changepassword';
import Verify from './pages/verify';

// Get the subdomain.
const host = window.location.host.split('.')

// GET parameters.
const getParameters = new URLSearchParams(window.location.search)

export const WebRoutes = [
    {
        path: "/",
        component: <Home/>
    },
    {
        path: "/login",
        component: <Login justRegistered={getParameters.get("jr")}/>
    },
    {
        path: "/verify",
        component: <Verify token={getParameters.get("vt")}/>
    },
    {
        path: "/forgot-password",
        component: <ChangePassword/>
    },
    {
        path: "/register",
        component: <Register/>
    },
    {
        path: "/dashboard",
        component: <Dashboard/>
    },
    {
        path: "",
        component: <AppError></AppError>,
        status: 404
    },

]

const specialSubdomains = ["ge"]

const AppRoutes = () => <RouterProvider>
    {WebRoutes.map((route, k) => <Route key={k} status={route.status ? route.status : 200}
                                        path={route.path}>{route.component}</Route>)}
</RouterProvider>

if (((host.length === 2 && host[1].includes('localhost')) || (host.length === 3)) && host[0] !== 'www')
{
    if (host[0].length < 4 && !specialSubdomains.includes(host[0]))
        window.location.href = 'https://www.rar.vg'
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
