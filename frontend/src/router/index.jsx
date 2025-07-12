import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import HomePage from '../pages/HomePage';
import ProductsPage from '../pages/ProductsPage';
import BlogsPage from '../pages/BlogsPage';
import ContactPage from '../pages/ContactPage';
import DigitalCardPage from '../pages/DigitalCardPage';
import EngineeringProjectsPage from '../pages/EngineeringProjectsPage';
import OurBusinessCardPage from '../pages/OurBusinessCardPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'products', element: <ProductsPage /> },
      { path: 'digital-business-card', element: <DigitalCardPage /> },
      { path: 'blogs', element: <BlogsPage /> },
      { path: 'engineering-projects', element: <EngineeringProjectsPage /> },
      { path: 'contact', element: <ContactPage /> },
      // --- UPDATED: Path is now clean and top-level ---
      { path: 'vCard', element: <OurBusinessCardPage /> },
    ],
  },
]);
