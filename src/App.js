// import logo from './logo.svg';
import './App.css';

//import Component
import LaunchLoadMap from './component/LaunchLoadMap/LaunchLoadMap';
import DevelopmentLoadMap from './component/DevelopmentRoadMap/DevelopmentLoadMap';
import Announcement from './component/Announcement/Announcement';
import Seven from './component/Seven/Seven';
import MetaVerse from './component/MetaVerse/MetaVerse';
import ToKnow from './component/ToKnow/ToKnow';
import Main from './component/Main/Main';
function App() {
  return (
    <div className="App">
      <Seven/>
      <Main/>
      <hr/>
      <MetaVerse/>
      <ToKnow/>
      <LaunchLoadMap />
      <DevelopmentLoadMap />
      <Announcement />
    </div>
  );
}

export default App;
