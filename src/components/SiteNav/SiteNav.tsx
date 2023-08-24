import { NavLink } from 'react-router-dom';

export default function SiteNav() {
  return (
    <nav className="site-nav">
      <div>
        <NavLink exact to="/" className="tab" activeClassName="activated">
          Home
        </NavLink>
        <NavLink to="/about" className="tab" activeClassName="activated">
          About
        </NavLink>
      </div>
    </nav>
  );
}
