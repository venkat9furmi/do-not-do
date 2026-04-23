import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useAppContext } from '../context/AppContext';
import { Navbar } from '../components/Navbar';
import { PostCard } from '../components/PostCard';
import { UserCircle } from 'lucide-react';

export const MyFeed = () => {
  const { currentUser } = useAuth();
  const { posts } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/auth');
    }
  }, [currentUser, navigate]);

  if (!currentUser) return null;

  const myPosts = posts.filter(post => post.authorId === currentUser.id);

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
            <UserCircle size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '32px', margin: 0 }}>My Feed</h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Your personal "Do Not Do" list.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {myPosts.length === 0 ? (
            <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              You haven't posted anything yet! Click the + button above to start.
            </div>
          ) : (
            myPosts.map(post => (
              <PostCard key={post.id} text={post.text} createdAt={post.createdAt} />
            ))
          )}
        </div>
      </main>
    </div>
  );
};
