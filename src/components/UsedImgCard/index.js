import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { sortImage } from '../../store';
import './style.css';
import Utilities from '../Utilities';

export default function UsedImgCard({ id, imgSrc, styles, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, dropRef] = useDrop({
    accept: 'image',
    hover(item, monitor) {
      if (!ref.current || !item.id) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);
      dispatch(sortImage({ dragIndex, hoverIndex }));
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'image', id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;
  dragRef(dropRef(ref));

  const [isHovering, setHovering] = useState(false);
  const style = {
    backgroundImage: `url(${imgSrc})`,
    backgroundSize: 'cover',
  };

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="used-img-wrapper"
    >
      <div ref={ref} className="used-img-card" style={{ ...style, opacity }} />
      <div className="utilities-wrapper" styles={{ display: isDragging ? 'none' : 'block' }}>
        <Utilities hovering={isHovering} droppedImgId={id} imgSrc={imgSrc} styles={styles} />
      </div>
    </div>
  );
}

UsedImgCard.propTypes = {
  id: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  imgSrc: PropTypes.string.isRequired,
  styles: PropTypes.shape(),
};
