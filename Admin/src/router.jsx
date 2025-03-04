import { Route, Routes } from "react-router-dom";
import App from "./App";

export const router = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>
    </div>
  );
};

export default router;
