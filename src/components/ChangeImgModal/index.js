import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selector, closeModal, updateImage } from '../../store';
import './style.css';

export default function ChangeImgModal() {
  const dispatch = useDispatch();
  const { images } = useSelector(selector);
  const [selectedImg, setSelectedImg] = useState(null);
  const renderImage = () => {
    const LIMIT = 8;

    return images.map((item, i) => {
      if (i > LIMIT) return null;

      return (
        <div
          key={item.name}
          role="button"
          aria-hidden="true"
          className={
            item.img === selectedImg ? 'img-container active-selected-img' : 'img-container'
          }
          style={{ background: `url(${item.img})`, backgroundSize: 'cover' }}
          onClick={() => setSelectedImg(item.img)}
        />
      );
    });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Select an image</h3>
        </div>
        <div className="modal-body">{renderImage()}</div>
        <div className="modal-footer">
          <button onClick={() => dispatch(closeModal())} className="close-btn" type="button">
            Cancel
          </button>
          <button
            type="button"
            className="confirm-btn"
            disabled={!selectedImg}
            onClick={() => dispatch(updateImage({ imgSrc: selectedImg }))}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
