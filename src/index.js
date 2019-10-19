import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Componentes/App';
import AppNueva from './Componentes/AppNueva';
import AppNueva2 from './Componentes/AppNueva2';

import registerServiceWorker from './registerServiceWorker';
import { Router, Route, browserHistory } from 'react-router-3';
import LoginForm from './Componentes/LoginForm';
import VistaTablaNuevo from './Componentes/VistaTablaNueva';


class Index extends React.Component {
    render() {
        return(
            <Router history={browserHistory}>
            <Route
                component={() => <LoginForm />}
                path="/">
            </Route>
            <Route path="/:name" component={App}></Route>
            <Route path="/vista/nueva" component={AppNueva}></Route>
            <Route path="/vista/nueva2" component={AppNueva2}></Route>
            <Route path="/vista/tabla" component={ VistaTablaNuevo}></Route>
           
          </Router>
          )
      }
      
}

ReactDOM.render(
    <Index/>, document.getElementById('root'));

registerServiceWorker();