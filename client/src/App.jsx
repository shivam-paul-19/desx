import CanvasPage from './CanvasPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';
import LandingPage from './LandingPage';
import Validate from './Validation';
import SetPass from './setPass';
import UserPage from './User';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingPage />
    },
    {
      path: '/home',
      element: <Home />
    },
    {
      path: '/canvas',
      element: <CanvasPage />
    },
    {
      path: '/validate',
      element: <Validate />
    },
    {
      path: '/password',
      element: <SetPass />
    },
    {
      path: '/user',
      element: <UserPage />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App