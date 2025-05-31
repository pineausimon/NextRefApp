import { useNavigate } from "react-router-dom";
import './App.css';
import { useAuth } from "../features/auth/context/AuthContext";
import Button from "../shared/components/Button/button.component";

type LayoutProps = {
  children: React.ReactNode;
};

export default function AppLayout({ children }: LayoutProps) {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="app-layout">
      <header className="app-header">
        <Button className="header-btn"  label="Accueil" onClick={() => navigate("/home")} variant="secondary"/>
        
        <div className="header-actions">
          {/* TODO : Add search bar with autocomplete */}
          {isAuthenticated && (
            <Button className="header-btn logout"  onClick={logout} label="Se déconnecter" variant="danger"/>
          )}
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}