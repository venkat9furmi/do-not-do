import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { Settings, LogOut, User } from 'lucide-react';

export const Profile = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '0 20px 40px' }}>
      <Navbar />
      
      <main className="animate-fade-in" style={{ maxWidth: '600px', margin: '40px auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '50%', 
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Settings size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '32px', margin: 0 }}>Profile Settings</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Manage your account.
            </p>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: 'rgba(255, 51, 51, 0.1)',
              border: '1px solid var(--accent-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <User size={32} color="var(--accent-primary)" />
            </div>
            <div>
              <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '14px' }}>Username</p>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: '600' }}>{currentUser.username}</p>
            </div>
          </div>
          
          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '24px 0' }} />

          <button onClick={handleLogout} className="btn btn-ghost" style={{ width: '100%', color: 'var(--error)', borderColor: 'rgba(255, 77, 77, 0.2)' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </main>
    </div>
  );
};
