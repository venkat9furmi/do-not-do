import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Plus, List, Settings, LogIn } from 'lucide-react';

export const Navbar = () => {
  const { currentUser } = useAuth();

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
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h2 className="gradient-text" style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>
            Do Not Do
          </h2>
        </Link>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to={currentUser ? "/dashboard" : "/auth"} className="btn btn-primary" style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} title="Add Post">
          <Plus size={20} />
        </Link>
        <Link to={currentUser ? "/my-feed" : "/auth"} className="btn btn-ghost" style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} title="My Feed">
          <List size={20} />
        </Link>
        <Link to={currentUser ? "/profile" : "/auth"} className="btn btn-ghost" style={{ padding: '8px', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} title={currentUser ? "Profile Settings" : "Login"}>
          {currentUser ? <Settings size={20} /> : <LogIn size={20} />}
        </Link>
      </div>
    </nav>
  );
};
