import {Fragment, lazy, Suspense} from "react";
import {Route, Routes} from "react-router-dom";

import "swiper/css";
import Main from "./components/layout/Main.js";
import ForgotPage from "./pages/ForgotPage.js";
import LoginPage from "./pages/LoginPage.js";
import RegisterPage from "./pages/RegisterPage.js";
// import HomePage from "./pages/HomePage";
// import MovieDetailPage from "./pages/MovieDetailPage";
// import MoviePage from "./pages/MoviePage";

const HomePage = lazy(() => import("./pages/HomePage.js"));
const MovieDetailPage = lazy(() => import("./pages/MovieDetailPage.js"));
const MoviePage = lazy(() => import("./pages/MoviePage.js"));

// import {NavLink} from "react-router-dom";
// fallback can import loading component

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/movie" element={<MoviePage></MoviePage>}></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="/register"
              element={<RegisterPage></RegisterPage>}
            ></Route>
            <Route path="/forgot" element={<ForgotPage></ForgotPage>}></Route>
            <Route
              path="/movie/:movieId"
              element={<MovieDetailPage></MovieDetailPage>}
            ></Route>
            <Route path="/*" element={<>Not Found this page</>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
