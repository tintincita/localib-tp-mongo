
  
  export const NavBar = ({ className }) => {
    return (
      <nav className={className}>
        <a href="/clients">
          Clients
        </a>
        <a href="/vehicules">
          Vehicules
        </a>
        <a href="/locations">
          Locations
        </a>
      </nav>
    );
  };