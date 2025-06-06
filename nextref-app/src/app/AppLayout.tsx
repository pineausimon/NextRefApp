import './App.css';
import { AppNavbar } from './AppNavbar';

type LayoutProps = {
    children: React.ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
    return (
        <div className="app-layout">
            <AppNavbar />
            <main className="main-content">{children}</main>
        </div>
    );
}
