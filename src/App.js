import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
//import Main from './app/main';
import 'typeface-roboto';
import Main from './app/MenuPrincipal';
import IngresarVehiculo from './app/Vehiculos/IngresarVehiculos';
import Listado from './app/Vehiculos/ListarVehiculo';
//import ArchivosPendientes from './app/Utils/ArchivosPendients';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header >
          <Main 
          vehiculo={1}
          funSubir={()=>console.log('algo')}
          funAct={()=>console.log('algo2')}
          funHome={()=>console.log('Home')}
          funCambio={()=>console.log('cambio')}
          />
        </header>
      </div>
    );
  }
}

export default App;
