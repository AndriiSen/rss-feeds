import "./App.css";
import { Routes } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { PostsView } from "./pages/posts-view";
import { LoginView } from "./pages/login-view";
import { RegisterView } from "./pages/register-view";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<PostsView />} />
        <Route path='/login' element={<LoginView />} />
        <Route path='/register' element={<RegisterView />} />
      </Routes>
    </Router>
  );
};

export default App;
