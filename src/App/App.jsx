import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/ui/navBar";
import Login from "./layouts/login";
import Main from "./layouts/main";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import { useDispatch } from "react-redux";
import { loadQualitiesList } from "./store/qualities";


const App = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
    }, [])
    return (
        <div>
            <AuthProvider>
                <NavBar />
                    <Switch>
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            exact
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/logout" component={LogOut}/>
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
            </AuthProvider>
            <ToastContainer />
        </div>


    );
};

export default App;
