import { Clock } from 'lucide-react';

export const PostCard = ({ text, createdAt }) => {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="glass-panel animate-slide-up" style={{
      padding: '24px',
      marginBottom: '16px',
      transition: 'all 0.3s ease',
      cursor: 'default'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 40px 0 rgba(0, 0, 0, 0.45)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
    }}
    >
      <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '16px' }}>
        {text}
      </p>
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '6px', 
        color: 'var(--text-muted)',
        fontSize: '14px' 
      }}>
        <Clock size={14} />
        <span>{date}</span>
      </div>
    </div>
  );
};
