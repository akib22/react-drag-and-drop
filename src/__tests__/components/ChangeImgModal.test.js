import { render, screen, fireEvent, cleanup } from '../../utils/test-util';
import store, { getImagesSuccess } from '../../store';
import seeds from '../../seeds/images';
import ChangeImgModal from '../../components/ChangeImgModal';

afterEach(cleanup);

describe('<ChangeImgModal />', () => {
  beforeEach(() => {
    store.dispatch(getImagesSuccess(seeds.images));
    render(<ChangeImgModal />);
  });

  it('should "Confirm" to be disabled if not select any image', () => {
    expect(screen.getByText(/Select an image/)).toBeInTheDocument();
    expect(screen.getByText(/Confirm/)).toBeDisabled();
  });

  it('should "Confirm" to be enable if select any image', () => {
    const changeableImg = screen.getAllByTestId('changeable-img')[0];
    fireEvent.click(changeableImg);
    expect(screen.getByText(/Confirm/)).toBeEnabled();
  });
});
