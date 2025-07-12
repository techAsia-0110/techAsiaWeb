import { create } from 'zustand';

// Get user info from localStorage if it exists
const getInitialUserInfo = () => {
  const userInfo = localStorage.getItem('userInfo');
  try {
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Failed to parse userInfo from localStorage", error);
    return null;
  }
};

const useAuthStore = create((set) => ({
  userInfo: getInitialUserInfo(),

  // Action to set user info on login
  login: (userInfo) => {
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    set({ userInfo });
  },

  // Action to clear user info on logout
  logout: () => {
    localStorage.removeItem('userInfo');
    set({ userInfo: null });
  },
}));

export default useAuthStore;