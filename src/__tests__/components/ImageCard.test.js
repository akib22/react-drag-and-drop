import { cleanup, render, screen } from '../../utils/test-util';
import ImageCard from '../../components/ImageCard';

afterEach(cleanup);

describe('<ImageCard />', () => {
  it('should be draggable', () => {
    render(
      <ImageCard
        id={1}
        imgSrc="https://vignette.wikia.nocookie.net/breakingbad/images/c/c1/4x11_-_Huell.png/revision/latest?cb=20130913100459&path-prefix=es"
        name="Huell"
      />,
    );
    const imgCard = screen.getByTestId('img-card');
    expect(imgCard).toHaveAttribute('draggable', 'true');
  });
});
