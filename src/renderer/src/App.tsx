import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

const App = (): JSX.Element => (
  <BrowserRouter>
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/checkout" element={<Checkout />} />
    </Routes>
  </BrowserRouter>
);

export default App;
