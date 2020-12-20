import { MdImage } from 'react-icons/md';
import './style.css';

export default function Canvas() {
  // const classNames = ' justify-center align-center';

  return (
    <div className="canvas-container">
      <div className="canvas justify-center align-center">
        <div className="show-info">
          <div className="flex justify-center">
            <span className="icon-wrapper">
              <MdImage size={20} />
            </span>
          </div>

          <p>Drop an image from Media Panel</p>
        </div>
      </div>
    </div>
  );
}
