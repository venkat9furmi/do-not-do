import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { PostCard } from '../components/PostCard';
import { Globe } from 'lucide-react';

export const GlobalFeed = () => {
  const { currentUser } = useAuth();
  const { posts } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  return (
    <div style={{ minHeight: '100vh', padding: '0 20px 40px' }}>
      <Navbar />
      
      <main className="animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto' }}>
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
            <Globe size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '32px', margin: 0 }}>Global Feed</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Anonymous confessions from around the world.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {posts.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No one has posted anything yet. Be the first!
            </div>
          ) : (
            posts.map(post => (
              <PostCard key={post.id} text={post.text} createdAt={post.createdAt} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};
