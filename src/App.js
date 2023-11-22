
import './App.css';
import Banner from './Components/Banner/Banner';
import NavBar from './Components/NavBar/NavBar';
import RowPost from './Components/RowPost/RowPost';
import { Action, Originals } from './urls';

function App() {
  return (
    <div>
      <NavBar/>
      <Banner/>
      <RowPost url={Originals} title='Netflix Originals'isSmall />
      <RowPost url={Action} title='Action' isSmall /> 
    </div>
  );
}

export default App;
