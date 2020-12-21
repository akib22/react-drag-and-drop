import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { MdSettings, MdDelete, MdWbSunny } from 'react-icons/md';
import { FaFire, FaTint } from 'react-icons/fa';
import { removeDroppedImg, showModal, updateImgStyles } from '../../store';
import './style.css';

export default function Utilities({ hovering, imgSrc, index, styles }) {
  const dispatch = useDispatch();
  const [isSettingTabOpen, setSettingTapOpen] = useState(false);
  const [isDeleteTabOpen, setDeleteTabOpen] = useState(false);
  const [whichTabOpen, setWhichTabOpen] = useState('image');

  // reset state after mouse move
  if ((isSettingTabOpen || isDeleteTabOpen) && !hovering) {
    setSettingTapOpen(false);
    setDeleteTabOpen(false);
    setWhichTabOpen('image');
  }

  const handleSettingTab = () => {
    setSettingTapOpen(!isSettingTabOpen);
    setDeleteTabOpen(false);
  };

  const handleDeleteTab = () => {
    setSettingTapOpen(false);
    setDeleteTabOpen(true);
  };

  const onCancel = () => {
    setDeleteTabOpen(false);
  };

  const onDelete = () => {
    dispatch(removeDroppedImg({ index }));
    setSettingTapOpen(false);
    setDeleteTabOpen(false);
    setWhichTabOpen('image');
  };

  const handleStyleChange = (val) => {
    dispatch(updateImgStyles({ index, val }));
  };

  return (
    <div className="utilities">
      <div className="utilities-tab">
        <button
          className={`${isSettingTabOpen ? 'active' : ''}`}
          onClick={() => handleSettingTab()}
          type="button"
        >
          <MdSettings />
        </button>
        <span>|</span>
        <button
          className={`${isDeleteTabOpen ? 'active' : ''}`}
          onClick={() => handleDeleteTab()}
          type="button"
        >
          <MdDelete />
        </button>
      </div>
      <div className="utilities-content">
        {isSettingTabOpen && (
          <div className="settings">
            <div className="tab-list">
              <button
                className={`${whichTabOpen === 'image' ? 'tab-active' : ''}`}
                type="button"
                onClick={() => setWhichTabOpen('image')}
              >
                Image
              </button>
              <button
                className={`${whichTabOpen === 'filter' ? 'tab-active' : ''}`}
                type="button"
                onClick={() => setWhichTabOpen('filter')}
              >
                Filter
              </button>
            </div>
            <div className="tab-content">
              {whichTabOpen === 'image' ? (
                <div className="image">
                  <img src={imgSrc} alt="change" />
                  <button
                    className="change-img-btn"
                    type="button"
                    onClick={() => dispatch(showModal({ imageId: index }))}
                  >
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="filter">
                  <div className="flex align-center">
                    <div className="flex output">
                      <FaTint size={16} />
                    </div>
                    <input
                      className="range"
                      type="range"
                      min="0"
                      max="1"
                      value={styles.blur}
                      step="0.1"
                      onChange={({ target }) =>
                        handleStyleChange({ blur: parseFloat(target.value, 10) })
                      }
                    />
                    <output className="output">{styles.blur}</output>
                  </div>
                  <div className="flex align-center">
                    <div className="flex output">
                      <MdWbSunny size={16} />
                    </div>
                    <input
                      className="range"
                      type="range"
                      min="0"
                      max="3"
                      value={styles.brightness}
                      step="0.1"
                      onChange={({ target }) => {
                        handleStyleChange({ brightness: parseFloat(target.value, 10) });
                      }}
                    />
                    <output className="output">{styles.brightness}</output>
                  </div>
                  <div className="flex align-center">
                    <div className="flex output">
                      <FaFire size={16} />
                    </div>
                    <input
                      className="range"
                      type="range"
                      min="0"
                      max="3"
                      value={styles.contrast}
                      step="0.1"
                      onChange={({ target }) => {
                        handleStyleChange({ contrast: parseFloat(target.value, 10) });
                      }}
                    />
                    <output className="output">{styles.contrast}</output>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {isDeleteTabOpen && (
          <div className="delete">
            <p>Are you sure?</p>
            <div className="mt-5">
              <button type="button" className="cancel-btn" onClick={() => onCancel()}>
                Cancel
              </button>
              <button type="button" className="delete-btn" onClick={() => onDelete()}>
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

Utilities.propTypes = {
  hovering: PropTypes.bool.isRequired,
  imgSrc: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  styles: PropTypes.shape(),
};
