import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Main from './app/main';
import 'typeface-roboto';
import Main from './app/MenuPrincipal';
import IngresoRemiseria from './app/Remiseria/ingresoRemiseria';
import RenovacionAgencia from './app/Remiseria/RenovacionAgencia';
import ModificarSocios from './app/Remiseria/ModificacionSocios';
import SubirArchivos from './app/SubidaArchivo/SubidaArchivo';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header >
          <SubirArchivos/>
        </header>
      </div>
    );
  }
}

export default App;
