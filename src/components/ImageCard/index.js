import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';
import './style.css';

export default function ImageCard({ id, imgSrc, name }) {
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'image', id, imgSrc, name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  const style = {
    backgroundImage: `url(${imgSrc})`,
    backgroundSize: 'cover',
  };
  const draggingStyle = isDragging ? { opacity: 0.5, borderColor: '#fff' } : null;

  return (
    <div className="img-wrapper img-bottom-margin" style={draggingStyle}>
      <div data-testid="img-card" ref={dragRef} className="img-card" style={style} />
    </div>
  );
}

ImageCard.propTypes = {
  id: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};
