import './App.css';
import Users from "./pages/Users";
import {Route, Routes} from "react-router";
import Login from "./components/Login";
import AuthRequire from "./components/AuthRequire";
import Teams from "./pages/Teams";
import Ligas from "./pages/Ligas";
import Layout from "./components/Layout";
import City from "./pages/City";
import Advertisement from "./pages/Advertisement";

function App() {

    return (
        <Routes>
            {/*private routes*/}
            <Route element={<AuthRequire/>}>
                <Route element={<Layout/>}>
                    <Route path={'/users'} element={<Users/>}/>
                    <Route path={'/'} element={<Users/>}/>
                    <Route path={'/teams'} element={<Teams/>}/>
                    <Route path={'/ligas'} element={<Ligas/>}/>
                    <Route path={'/city'} element={<City/>}/>
                    <Route path={'/advertisements'} element={<Advertisement/>}/>
                </Route>

            </Route>
            {/*public routes*/}
            <Route path="/login" element={<Login/>}/>
            <Route path={'*'} element={<Login/>}/>
        </Routes>
    );
}

export default App;
