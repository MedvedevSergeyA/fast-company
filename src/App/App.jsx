import React from "react";
import UsersListPage from "./components/page/usersListPage/usersListPage";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <NavBar />
                <Switch>
                    <Route path="/users" exact component={UsersListPage} />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/" exact component={Main} />
                    <Route path="/users/:userId?/:edit?" exact component={Users} />
                    <Redirect to="/" />
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;
