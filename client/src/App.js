import Home from "./pages/home/Home.jsx";
import Teams from "./pages/workspace/Teams.jsx";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/workspace" element={<Teams />} />
        {/* <Workspace /> */}
      </Routes>
    </div>
  );
}
