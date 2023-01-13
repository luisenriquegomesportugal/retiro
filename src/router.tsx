import { Routes as RouteList, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Sorteio from "./pages/Sorteio";
import Inscricoes from "./pages/Inscricoes";
import Vendinha from "./pages/Vendinha";

export const Routes = () => <RouteList>
    <Route path="/" element={<Dashboard />} />
    <Route path="/sorteio" element={<Sorteio />} />
    <Route path="/inscricoes" element={<Inscricoes />} />
    <Route path="/vendinha" element={<Vendinha />} />
</RouteList>;