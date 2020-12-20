import './style.css';

export default function ImageCard() {
  const style = {
    backgroundImage:
      'url("https://images.amcnetworks.com/amc.com/wp-content/uploads/2015/04/cast_bb_700x1000_walter-white-lg.jpg")',
    backgroundSize: 'cover',
  };

  return (
    <div className="img-wrapper img-bottom-margin">
      <div className="img-card " style={style} />
    </div>
  );
}
