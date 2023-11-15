import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AddRecipe } from "./pages/AddRecipe.jsx";
import { Home } from "./pages/Home.jsx";
import { RecipeDetails } from "./pages/RecipeDetails.jsx";
import { Header } from "./componentes/Header";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { RouterAuth } from "./router/RouterAuth.jsx";
import { HandleLoginAuth } from "./router/HandleLoginAuth.jsx";
import { ShoppingList } from "./pages/ShoppingList.jsx";
import { Footer } from "./componentes/Footer.jsx";
import { useLocation } from "react-router-dom";
function App() {
  let location = useLocation();

  return (
    <div className="App">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route
            path="/addrecipe"
            element={
              <RouterAuth>
                <AddRecipe />{" "}
              </RouterAuth>
            }
          />
          <Route
            path="/profile/:userId"
            element={
              <RouterAuth>
                <Profile />
              </RouterAuth>
            }
          />
          <Route
            path="/shoppingList/:userId"
            element={
              <RouterAuth>
                <ShoppingList />
              </RouterAuth>
            }
          />

          <Route
            path="/login"
            element={
              <HandleLoginAuth>
                <Login />
              </HandleLoginAuth>
            }
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>

      {location.pathname === "/" ||
      location.pathname === "/register" ||
      location.pathname === "/login" ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;
