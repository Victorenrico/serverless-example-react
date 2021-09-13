import 'semantic-ui-css/semantic.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { Detail } from './pages/Detail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/item" component={Create} />
        <Route exact path="/item/:id" component={Detail} />
      </Switch>
    </Router>
  );
}

export default App;
