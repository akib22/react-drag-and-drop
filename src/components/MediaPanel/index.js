/* eslint-disable camelcase */
import { useSelector } from 'react-redux';
import './style.css';
import ImageCard from '../ImageCard';
import { selector } from '../../store';

export default function Canvas() {
  const { images } = useSelector(selector);
  return (
    <div data-testid="media-panel" className="media-panel">
      <span className="panel-title">Media Panel</span>
      <div>
        {images.map(({ name, char_id, img }) => (
          <ImageCard key={name} id={char_id} imgSrc={img} name={name} />
        ))}
      </div>
    </div>
  );
}
