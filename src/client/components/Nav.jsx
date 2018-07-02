import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Form, FormGroup, Input, NavItem } from 'reactstrap';

export default function Nav(props) {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <span className="navbar-brand">
        My Pokédex
      </span>
      <ul className="navbar-nav mr-auto">
        <NavItem>
          <NavLink to="/" exact={true} className="nav-link">Home</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/pokedex" exact={true} className="nav-link">Pokédex</NavLink>
        </NavItem>
      </ul>
    </nav>
  );
}
