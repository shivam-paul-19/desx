import CanvasPage from './CanvasPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import LandingPage from './LandingPage';
import Validate from './Validation';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/home',
      element: <Home user="Shivam"/>
    },
    {
      path: '/canvas',
      element: <CanvasPage />
    },
    {
      path: '/validate',
      element: <Validate />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App