import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import CreateTask from "./pages/CreateTask";
import Profile from "./pages/Profile";
import EditTask from "./pages/EditTask";
import PrivateRoute from "./components/PrivateRoute";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/search" element={<Search />} />
        <Route element={<PrivateRoute />}>
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/editTask/:taskId" element={<EditTask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
