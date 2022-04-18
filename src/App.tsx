import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './routes';

const App: React.FC = () => {
  const element = useRoutes(routes);
  console.log('04-18');

  return element;
};

export default App;
