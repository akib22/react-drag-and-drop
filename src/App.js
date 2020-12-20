import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Canvas from './components/Canvas';
import MediaPanel from './components/MediaPanel';
import { fetchImages, selector } from './store';

function App() {
  const dispatch = useDispatch();
  const { loading, hasError } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchImages());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (hasError) {
    return <div>Something went wrong</div>;
  }

  return (
    <div className="flex">
      <MediaPanel />
      <Canvas />
    </div>
  );
}

export default App;
