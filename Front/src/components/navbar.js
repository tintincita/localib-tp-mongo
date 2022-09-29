import logo from "../assets/localib.png";

const NavBar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {/* <!-- Container wrapper --> */}
      <div className="container-fluid" style={{backgroundColor: 'white'}}>
        {/* <!-- Toggle button --> */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        {/* <!-- Collapsible wrapper --> */}
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <!-- Navbar brand --> */}
          <a className="navbar-brand mt-2 mt-lg-0" href="#">
            <img src={logo} height="120" alt="localib Logo" loading="lazy" />
          </a>
          {/* <!-- Left links --> */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/clients">
                Clients
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/vehicules">
                Vehicules
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/locations">
                Locations
              </a>
            </li>
          </ul>
          {/* <!-- Left links --> */}
        </div>
        {/* <!-- Collapsible wrapper --> */}
      </div>
      {/* <!-- Container wrapper --> */}
    </nav>
  );
};

export default NavBar;
