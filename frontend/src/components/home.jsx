import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Posts from "./posts";

function Home() {
  return (
    <div>
      <Posts />
    </div>
  );
}

export default Home;