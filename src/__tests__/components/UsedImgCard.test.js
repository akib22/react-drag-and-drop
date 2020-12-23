import { render, screen, fireEvent, cleanup } from '../../utils/test-util';
import seeds from '../../seeds/images';
import UsedImgCard from '../../components/UsedImgCard';

afterEach(cleanup);

describe('<UsedImgCard />', () => {
  beforeEach(() =>
    render(
      <UsedImgCard
        id={seeds.droppedImg.id}
        imgSrc={seeds.droppedImg.imgSrc}
        styles={seeds.droppedImg.styles}
        index={0}
      />,
    ),
  );

  it('should be draggable', () => {
    const dropImgCard = screen.getByTestId('dropped-img-card');
    expect(dropImgCard).toHaveAttribute('draggable', 'true');
  });

  it('should show utilities component on hover event', () => {
    const droppedImg = screen.getByTestId('dropped-img');
    const utilitiesWrapper = screen.getByTestId('utilities-wrapper');
    fireEvent.mouseEnter(droppedImg);
    expect(utilitiesWrapper).toHaveStyle({ display: 'block' });
  });
});
