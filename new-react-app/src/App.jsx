import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./frontend/Home";
import About from "./frontend/About";
import Contact from "./frontend/Contact";
import Login from "./frontend/Login";
import FrontentLayouts from "./layouts/FrontentLayouts";
import BackendLayouts from "./layouts/BackendLayouts";
import Notice from "./dashboard/Notice";
import NoticeBoard from "./dashboard/NoticeBoard";
import AuthContextProvider from "./contexts/AuthContext";
import AuthRoutes from "./routes/AuthRoutes";
// import { StateProvider } from "./components/StateProvider";
// import reducer, { initialState } from "./components/reducer";
import NoticeTable from "./dashboard/QuestionAnswer";
// import { StateProvider } from "./components/StateProvider";
// import reducer, { initialState } from "./components/reducer";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FrontentLayouts />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
          </Route>

          <Route
            path="/dashboard"
            element={
              <AuthRoutes>
                {" "}
                <BackendLayouts />{" "}
              </AuthRoutes>
            }
          >
            <Route index element={<NoticeBoard />} />
            <Route path={`notice/:id`} element={<Notice />} />
            <Route path={`notice-answer/:id`} element={<NoticeTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
