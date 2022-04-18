import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../store';
import Home from './index';

describe('home test', () => {
  it('render component to test', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Home />;
      </Provider>
    );
  });
});
