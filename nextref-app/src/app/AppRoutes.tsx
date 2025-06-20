import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import HomePage from '../features/home/HomePage';
import ContentsSearchPage from '../features/contents/pages/ContentsSearchPage';
import CollectionsListPage from '../features/collections/pages/CollectionsListPage';
import { PrivateRoute } from '../shared/components/PrivateRoute/private-route.component';

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
                path="/home"
                element={
                    <PrivateRoute>
                        <HomePage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/collections"
                element={
                    <PrivateRoute>
                        <CollectionsListPage />
                    </PrivateRoute>
                }
            />
            <Route
                path="/contents"
                element={
                    <PrivateRoute>
                        <ContentsSearchPage />
                    </PrivateRoute>
                }
            />
        </Routes>
    );
}
