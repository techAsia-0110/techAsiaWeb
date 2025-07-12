import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProductManagementPage from './pages/ProductManagementPage';
import BlogManagementPage from './pages/BlogManagementPage';
import ProtectedRoute from './components/auth/ProtectedRoute'; // 1. IMPORT our guard
import { Toaster } from 'react-hot-toast';

const router = createBrowserRouter([
  // The login page is public
  { 
    path: "/", 
    element: <LoginPage /> 
  },
  
  // The products page is  wrapped in our ProtectedRoute component
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <ProductManagementPage />
      </ProtectedRoute>
    ),
  },

  // The blogs page is also protected
  {
    path: "/blogs",
    element: (
      <ProtectedRoute>
        <BlogManagementPage />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <>
      {/* 2. ADD the Toaster component here */}
      <Toaster 
        position="top-right" // Position the toasts
        toastOptions={{
          // Define default options
          duration: 5000,
          style: {
            background: '#333', // Dark background
            color: '#fff',       // White text
          },
          // Define success/error specific options
          success: {
            duration: 3000,
            theme: {
              primary: 'green',
              secondary: 'black',
            },
          },
        }}
      />
      <RouterProvider router={router} />
    </>
  );
}

export default App;