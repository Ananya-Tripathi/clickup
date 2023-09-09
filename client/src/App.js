import Home from "./pages/home/Home.jsx";
import Workspace from "./pages/workspace/Workspace.jsx";
import { Routes, Route } from "react-router-dom";
export default function App() {
  return (
    <div>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/workspace" element={<Workspace />} />
        {/* <Workspace /> */}
      </Routes>
    </div>
  );
}
