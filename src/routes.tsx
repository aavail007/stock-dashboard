import type { RouteObject } from 'react-router-dom';
import Home from './pages/home';
import StockAnalysis from './pages/stockAnalysis';
import Login from './pages/login';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
    children: []
  },
  {
    path: '/stock-analysis',
    element: <StockAnalysis />,
    children: []
  },
  {
    path: '/login',
    element: <Login />,
    children: []
  }
];

export default routes;
