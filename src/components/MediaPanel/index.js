import './style.css';
import ImageCard from '../ImageCard';

export default function Canvas() {
  return (
    <div className="media-panel">
      <span className="panel-title">Media Panel</span>
      <div>
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </div>
  );
}
