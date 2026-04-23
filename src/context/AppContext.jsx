import { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Load posts from localStorage on initial render
    const storedPosts = localStorage.getItem('donotdo_posts');
    if (storedPosts) {
      // Sort posts by date descending
      const parsed = JSON.parse(storedPosts);
      parsed.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(parsed);
    }
  }, []);

  const addPost = (text, authorId) => {
    const newPost = {
      id: Date.now().toString(),
      text,
      authorId,
      createdAt: new Date().toISOString()
    };
    
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('donotdo_posts', JSON.stringify(updatedPosts));
  };

  const value = {
    posts,
    addPost
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
