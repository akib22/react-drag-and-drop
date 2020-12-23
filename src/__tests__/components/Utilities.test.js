import { render, screen, fireEvent, cleanup } from '../../utils/test-util';
import seeds from '../../seeds/images';
import store, { dropImage } from '../../store';
import Utilities from '../../components/Utilities';

afterEach(cleanup);

describe('<Utilities />', () => {
  beforeEach(() =>
    render(
      <Utilities
        hovering
        imgSrc={seeds.droppedImg.imgSrc}
        styles={seeds.droppedImg.styles}
        index={0}
      />,
    ),
  );

  it('should show change image modal when click on settings button', () => {
    const settingsBtn = screen.getAllByRole('button')[0];
    fireEvent.click(settingsBtn);
    expect(screen.getByText(/Image/)).toBeInTheDocument();
    expect(screen.getByText(/Filter/)).toBeInTheDocument();
    expect(screen.getByText(/Change image/)).toBeInTheDocument();
  });

  it('should switch between "Image" and "Filter" tab', () => {
    const settingsBtn = screen.getAllByRole('button')[0];
    fireEvent.click(settingsBtn);
    fireEvent.click(screen.getByText(/Filter/));
    expect(screen.queryAllByRole('input')).toBeTruthy();
    fireEvent.click(screen.getByText(/Image/));
    expect(screen.getByText(/change image/i)).toBeInTheDocument();
  });

  it('should hide settings modal if setting modal open and click again', () => {
    const settingsBtn = screen.getAllByRole('button')[0];
    fireEvent.click(settingsBtn);
    expect(screen.getByText(/Image/)).toBeInTheDocument();
    fireEvent.click(settingsBtn);
    expect(screen.queryByText(/Image/)).toBeNull();
  });

  it('should show confirm delete modal when click on delete button', () => {
    const deleteBtn = screen.getAllByRole('button')[1];
    fireEvent.click(deleteBtn);
    expect(screen.getByText(/cancel/i)).toBeInTheDocument();
    expect(screen.getByText(/delete/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure/i)).toBeInTheDocument();
  });

  it('should delete the image when click on delete button inside delete modal', () => {
    store.dispatch(dropImage(seeds.droppedImg));
    expect(store.getState().image.droppedImages.length).toBe(1);
    const deleteBtn = screen.getAllByRole('button')[1];
    fireEvent.click(deleteBtn);
    fireEvent.click(screen.getByText(/delete/i));
    expect(store.getState().image.droppedImages.length).toBe(0);
  });
});
