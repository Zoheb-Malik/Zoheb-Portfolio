import { Route } from 'react-router-dom';

import SiteNav from './components/SiteNav/SiteNav';
import Home from './pages/Home/Home';
import About from './pages/About/About';

function App() {
  return (
    <>
      <SiteNav />
      <Route exact path='/' component={Home} />
      <Route path='/about' component={About} />
    </>
  );
}

export default App;
