import { cleanup, render, screen } from '../../utils/test-util';
import store, { dropImage } from '../../store';
import seeds from '../../seeds/images';
import Canvas from '../../components/Canvas';

afterEach(cleanup);

describe('<Canvas />', () => {
  it('Should render Info in the middle of canvas when data is empty', () => {
    render(<Canvas />);
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toHaveClass('justify-center align-center');
    expect(screen.getByText(/Drop an image from Media Panel/i)).toBeInTheDocument();
  });

  it('should render with given data', () => {
    store.dispatch(dropImage(seeds.droppedImg));
    render(<Canvas />);
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toHaveClass('content-start');
    expect(screen.queryByText(/Drop an image from Media Panel/i)).toBeNull();
    const droppedImg = screen.queryAllByTestId('dropped-img');
    expect(droppedImg.length).toBe(1);
  });
});
