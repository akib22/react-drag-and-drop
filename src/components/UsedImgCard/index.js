import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { sortImage } from '../../store';
import './style.css';
import Utilities from '../Utilities';

const ImageCard = styled.div`
  width: 300px;
  height: 195px;
  border-radius: 8px;
  background: ${(props) => props.backgroundImage};
  background-size: cover;
  opacity: ${({ isDragging }) => (isDragging ? 0.5 : 1)};
  filter: ${(props) =>
    `blur(${props.filter.blur}px) contrast(${props.filter.contrast}) brightness(${props.filter.brightness})`};
`;

export default function UsedImgCard({ id, imgSrc, styles, index }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, dropRef] = useDrop({
    accept: 'image',
    hover(item, monitor) {
      if (!ref.current || !item.index) {
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
  dragRef(dropRef(ref));

  const [isHovering, setHovering] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="used-img-wrapper"
    >
      <ImageCard
        ref={ref}
        filter={styles}
        backgroundImage={`url(${imgSrc})`}
        isDragging={isDragging}
      />
      <div className="utilities-wrapper" style={{ display: isDragging && 'none' }}>
        <Utilities
          hovering={isHovering}
          droppedImgId={id}
          imgSrc={imgSrc}
          styles={styles}
          index={index}
        />
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
