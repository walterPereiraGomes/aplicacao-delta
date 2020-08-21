import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Welcome from './screens/welcome';
import Aluno from './screens/aluno/cadastrar';
import Listagem from './screens/aluno/listagem';
import Menu from './screens/menu';

const Routes = () => (
    <BrowserRouter>
            <Menu></Menu>
            <Switch>
                <Route path="/" component={Welcome} exact />
                <Route path="/cadastro" component={Aluno} exact />
                <Route path="/listagem" component={Listagem} exact />
            </Switch>
    </BrowserRouter>
);

export default Routes;