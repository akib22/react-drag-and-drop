import { MdImage } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { selector, dropImage } from '../../store';
import UsedImgCard from '../UsedImgCard';
import './style.css';

export default function Canvas() {
  const dispatch = useDispatch();
  const [, dropRef] = useDrop({
    accept: 'image',
    drop: ({ id, imgSrc, name }) => {
      if (!id || !imgSrc) return;
      dispatch(dropImage({ id, imgSrc, name }));
    },
  });
  const { droppedImages } = useSelector(selector);
  const classNames =
    droppedImages.length > 0 ? 'canvas content-start' : 'canvas justify-center align-center';

  const renderImages = () =>
    droppedImages.map((item, idx) => (
      <UsedImgCard
        key={idx * 10}
        index={idx}
        id={item.id}
        imgSrc={item.imgSrc}
        styles={item.styles}
      />
    ));

  return (
    <div data-testid="canvas-container" className="canvas-container">
      <div data-testid="canvas" ref={dropRef} className={classNames}>
        {droppedImages.length === 0 ? (
          <div className="show-info">
            <div className="flex justify-center">
              <span className="icon-wrapper">
                <MdImage size={20} />
              </span>
            </div>
            <p>Drop an image from Media Panel</p>
          </div>
        ) : (
          renderImages()
        )}
      </div>
    </div>
  );
}
