import React from "react";
import { Route } from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";

function App() {
    return (
        <>
            <Route path="/" component={Home} exact></Route>
            <Route path="/profile" component={Profile}></Route>
            <Route path="/signup" component={SignupPage}></Route>
        </>
    );
}

export default App;
