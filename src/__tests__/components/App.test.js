import { render, screen } from '../../utils/test-util';
import store, { getImagesSuccess, getImagesFailed } from '../../store';
import seeds from '../../seeds/images';
import App from '../../App';

describe('<App />', () => {
  beforeEach(() => render(<App />));

  test('should render loader', () => {
    expect(screen.getByTestId('loader')).toBeTruthy();
  });

  test('should show something went wrong message', () => {
    store.dispatch(getImagesFailed());
    expect(screen.getByText(/Oops!/i)).toBeInTheDocument();
    expect(screen.getByText(/something went wrong./i)).toBeInTheDocument();
  });

  test('should render media panel and canvas', () => {
    store.dispatch(getImagesSuccess(seeds.images));
    expect(screen.getByTestId('media-panel')).toBeTruthy();
    expect(screen.getByTestId('canvas')).toBeTruthy();
  });
});
