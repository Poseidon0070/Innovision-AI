import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './pages/MainLayout'
import Forcast from './components/Forcast'
import { useState } from 'react';
import Weather from './components/CurrentLocation';
import Search from './components/Search';
import WeeklyForecast from './components/Forcast';
export default function App() {
  const [icon, setIcon] = useState("CLEAR_DAY");
  const [main, setMain] = useState(undefined);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { index: true, element: <Weather /> },
        { path: 'search', element: <Search /> },
        { path: 'weekly-forcast', element: <WeeklyForecast /> },
      ]
    },
  ])

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}
