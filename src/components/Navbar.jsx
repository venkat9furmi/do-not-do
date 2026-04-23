import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Plus, Globe } from 'lucide-react';

export const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="glass-panel" style={{ 
      margin: '20px auto', 
      maxWidth: '800px', 
      padding: '16px 24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: '20px',
      zIndex: 100
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link to="/" className="mz-logo">
          MZ
        </Link>
      </div>

      {currentUser && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link to="/dashboard" className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Plus size={20} />
          </Link>
          <Link to="/feed" className="btn btn-ghost" style={{ padding: '8px 16px', borderRadius: '8px' }}>
            <Globe size={18} /> Global Feed
          </Link>
          <div style={{ width: '1px', height: '24px', background: 'var(--glass-border)' }}></div>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '8px 16px', borderRadius: '8px', color: 'var(--error)' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};
