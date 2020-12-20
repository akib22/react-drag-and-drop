import { useState } from 'react';
import './style.css';
import Utilities from '../Utilities';

export default function UsedImgCard() {
  const [isHovering, setHovering] = useState(false);
  const style = {
    backgroundImage:
      'url("https://vignette.wikia.nocookie.net/breakingbad/images/9/95/JesseS5.jpg/revision/latest?cb=20120620012441")',
    backgroundSize: 'cover',
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="used-img-wrapper"
    >
      <div className="used-img-card" style={style} />
      <div className="utilities-wrapper">
        <Utilities hovering={isHovering} />
      </div>
    </div>
  );
}
