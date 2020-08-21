import React from 'react';
import { useHistory } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

const Menu = () => {
  const history = useHistory();
  function goToPortal() {
    history.push("/listagem");
  }
  return (
    <div className="container-menu one-edge-shadow">
      <a className="icon-delta" href="/">Grupo Delta</a>
      <Button variant="light" onClick={goToPortal}>Portal do Aluno</Button>
    </div>
  )
}

export default Menu;