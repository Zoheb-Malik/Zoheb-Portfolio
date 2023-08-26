import { Route } from 'react-router-dom';

import SiteNav from './components/SiteNav/SiteNav';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import AI from './pages/AI/AI';

function App() {
  return (
    <>
      <SiteNav />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/ai" component={AI} />
    </>
  );
}

export default App;
