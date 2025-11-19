import { BrowserRouter, Routes, Route} from "react-router-dom";
import Produto from "./pages/Produto";
import Checkout from "./pages/Checkout";
import Pagamente from "./pages/Pagamento";

function AppRoutes(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Produto/> } ></Route>
                <Route path="/Checkout" element={ <Checkout/> } ></Route>
                <Route path="/Pagamente" element={ <Pagamente/> } ></Route>          
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;