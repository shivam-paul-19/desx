import './App.css'
import CanvasPage from './CanvasPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './Home';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/canvas',
      element: <CanvasPage />
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App