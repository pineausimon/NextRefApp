import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../features/auth/context/AuthContext';
import AppRoutes from './AppRoutes';
import './App.css';
import AppLayout from './AppLayout';
import { NotificationProvider } from '../shared/notification/NotificationProvider';

export default function App() {
    return (
        <BrowserRouter>
            <NotificationProvider>
                <AuthProvider>
                    <AppLayout>
                        <AppRoutes />
                    </AppLayout>
                </AuthProvider>
            </NotificationProvider>
        </BrowserRouter>
    );
}
