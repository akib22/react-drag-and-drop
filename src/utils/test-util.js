import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import store from '../store';

const WithProvider = ({ children }) => (
  <Provider store={store}>
    <DndProvider backend={HTML5Backend}>{children}</DndProvider>
  </Provider>
);

const customRender = (ui, options) => render(ui, { wrapper: WithProvider, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
