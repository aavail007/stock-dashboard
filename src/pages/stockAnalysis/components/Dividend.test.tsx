import { render, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from 'store';
import Dividend from './Dividend';
describe('Dividend(股利) test', () => {
  it('tab 切換', async () => {
    const wrapper = render(
      <Provider store={store}>
        <Dividend />
      </Provider>
    );

    fireEvent.click(wrapper.getByTestId('t-stock-tab-btn'));
    await waitFor(() => {
      expect(wrapper.getByTestId('t-stock-tab-btn')).toHaveClass('active');
      expect(wrapper.getByTestId('t-stock-tab')).toHaveClass('active');
    });

    fireEvent.click(wrapper.getByTestId('t-cash-tab-btn'));
    await waitFor(() => {
      expect(wrapper.getByTestId('t-cash-tab-btn')).toHaveClass('active');
      expect(wrapper.getByTestId('t-cash-tab')).toHaveClass('active');
    });
  });
});
