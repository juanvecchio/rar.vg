import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'
import { AppHome } from './pages/home'
import { AppError } from './pages/error'
import { RouterProvider } from './router/router';
import { Route } from './router/route';
import { Login } from './pages/login'

export const WebRoutes = [
    {
        path: "/",
        component: <AppHome></AppHome>
    },
    {
        path:"/login",
        component: <Login></Login>
    },
    {
        path: "",
        component: <AppError></AppError>,
		status: 404
    }

]


const AppRoutes = () => <RouterProvider>
    {WebRoutes.map((route, k) => <Route key={k} status={route.status ? route.status : 200} path={route.path}>{route.component}</Route>)}
</RouterProvider>


ReactDOM.render(
    <AppRoutes></AppRoutes>,
    document.getElementById("root")
);

export default AppRoutes;