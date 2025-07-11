import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Project imports
import AppLayout from "../layout/app-layout";
import LoadingScreen from "../components/loadingScreen";
import { ProtectedRoute, AuthRoute, AdminRoute, UserRoute } from "./guard";

// Lazy load pages
const Dashboard = lazy(() => import('../pages/dashboard'));
const Login = lazy(() => import('../pages/login'));
const Signup = lazy(() => import('../pages/signup'));
const Error = lazy(() => import('../pages/error'));
const Form = lazy(() => import('../pages/form'));

const AppRouter = () => {
    return (
        <BrowserRouter>

            <Suspense fallback={<LoadingScreen />} >

                <Routes>
                    <Route element={<AuthRoute />}>
                        <Route
                            path="/login"
                            element={<Login />}
                        />

                        <Route
                            path="/signup"
                            element={<Signup />}
                        />
                    </Route>

                    {/* Protected routes */}
                    <Route element={<ProtectedRoute />}>

                        <Route element={<AppLayout />}>

                            {/* Admin routes */}
                            <Route element={<AdminRoute />}>
                                <Route
                                    path="/"
                                    element={<Dashboard />}
                                />
                            </Route>

                            {/* User routes */}
                            <Route element={<UserRoute />}>
                                <Route
                                    path="/form"
                                    element={<Form />}
                                />
                            </Route>

                        </Route>

                    </Route>

                    {/* Error route */}
                    <Route
                        path="*"
                        element={<Error />}
                    />
                </Routes>

            </Suspense>

        </BrowserRouter>
    );
};

export default AppRouter;