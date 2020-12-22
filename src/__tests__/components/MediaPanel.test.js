import { render, screen } from '../../utils/test-util';
import store, { getImagesSuccess } from '../../store';
import seeds from '../../seeds/images';
import MediaPanel from '../../components/MediaPanel';

describe('<MediaPanel />', () => {
  test('should render properly with given data', () => {
    store.dispatch(getImagesSuccess(seeds.images));
    render(<MediaPanel />);
    expect(screen.getByText(/Media Panel/i)).toBeInTheDocument();
    const imgCards = screen.queryAllByTestId('img-card');
    expect(imgCards.length).toBe(seeds.images.length);
  });
});
