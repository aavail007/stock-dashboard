import type { RouteObject } from 'react-router-dom';
import Home from './pages/home';
import StockAnalysis from './pages/stockAnalysis/stockAnalysis'

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
  }
]

export default routes
