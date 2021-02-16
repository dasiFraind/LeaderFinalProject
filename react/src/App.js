import './App.css';
import { Provider } from 'react-redux';
import store from './Redux/Store/store';
import Menu from './components/Menu';

import { BrowserRouter as Router } from 'react-router-dom';
function App() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App">
          <Menu></Menu>
  
        </div>
      </Provider>
    </Router>
  );
}

export default App;
