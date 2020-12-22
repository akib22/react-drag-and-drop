import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Canvas from './components/Canvas';
import MediaPanel from './components/MediaPanel';
import { fetchImages, selector, loadDataFromLocalStorage } from './store';
import ChangeImgModal from './components/ChangeImgModal';

function App() {
  const dispatch = useDispatch();
  const { loading, hasError, modalInfo } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchImages());
    dispatch(loadDataFromLocalStorage());
  }, [dispatch]);

  if (loading) {
    return (
      <div data-testid="loader" className="flex justify-center align-center h-full">
        <div className="loader" />
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="something-went-wrong">
        <div>
          <h1>Oops!</h1>
          <h3>Something went wrong.</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      {modalInfo.showModal ? <ChangeImgModal /> : null}
      <MediaPanel />
      <Canvas />
    </div>
  );
}

export default App;
