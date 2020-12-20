import { useState } from 'react';
import { MdSettings, MdDelete, MdWbSunny, MdBlurOn } from 'react-icons/md';
import './style.css';

// eslint-disable-next-line react/prop-types
export default function UsedImgCard({ hovering }) {
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
                  <img
                    src="https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441"
                    alt="change"
                  />
                  <button className="change-img-btn" type="button">
                    Change Image
                  </button>
                </div>
              ) : (
                <div className="filter">
                  <div className="flex align-center">
                    <div className="flex">
                      <MdWbSunny size={16} />
                    </div>
                    <input
                      className="range"
                      type="range"
                      min="0"
                      max="100"
                      value="10"
                      step="1"
                      onChange={(val) => console.log('log--> ', val.target.value)}
                    />
                    <output className="output">10%</output>
                  </div>
                  <div className="flex align-center">
                    <div className="flex">
                      <MdBlurOn size={16} />
                    </div>
                    <input
                      className="range"
                      type="range"
                      min="0"
                      max="100"
                      value="10"
                      step="1"
                      onChange={(val) => console.log('log--> ', val)}
                    />
                    <output className="output">10%</output>
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
              <button type="button" className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
