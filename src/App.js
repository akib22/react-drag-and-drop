import './App.css';
import Canvas from './components/Canvas';
import MediaPanel from './components/MediaPanel';

function App() {
  return (
    <div className="flex">
      <MediaPanel />
      <Canvas />
    </div>
  );
}

export default App;
