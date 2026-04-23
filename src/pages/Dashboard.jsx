import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { Send } from 'lucide-react';

export const Dashboard = () => {
  const [text, setText] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const { currentUser } = useAuth();
  const { addPost } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    addPost(text, currentUser.id);
    setText('');
    setSuccessMsg('Successfully posted to the Global Feed anonymously!');
    
    setTimeout(() => {
      setSuccessMsg('');
    }, 3000);
  };

  if (!currentUser) return null;

  return (
    <div style={{ minHeight: '100vh', padding: '0 20px 40px' }}>
      <Navbar />
      
      <main className="animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
          Welcome, <span className="gradient-text">{currentUser.username}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '18px' }}>
          What is something you absolutely do not want to do?
        </p>

        <div className="glass-panel" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <textarea
              placeholder="e.g., I don't want to attend that 8 AM meeting..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              style={{ resize: 'vertical', minHeight: '100px' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                {successMsg && (
                  <span className="animate-slide-up" style={{ color: 'var(--success)', fontSize: '14px' }}>
                    {successMsg}
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className="btn btn-primary"
                disabled={!text.trim()}
                style={{ opacity: !text.trim() ? 0.5 : 1, cursor: !text.trim() ? 'not-allowed' : 'pointer' }}
              >
                <Send size={18} /> Post Anonymously
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};
