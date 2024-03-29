import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "./contexts/ContextProvider";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Stacked,
  Pyramid,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  Financial,
  ColorPicker,
  ColorMapping,
  Editor,
  Expenses,
  TravelAdvisor,
  RealEstate,
  Blogs,
  Products,
  Crypto,
  Login,
} from "./pages";
import "./App.css";

import Cookies from "universal-cookie";
import RequireAuth from "./components/Auth/RequireAuth";

const cookies = new Cookies();
const App = () => {
  const { authData } = useSelector((state) => state.auth);

  // const authToken = cookies.get("token");

  const user = JSON.parse(localStorage.getItem("profile"));

  const authToken = user?.token;

  const {
    activeMenu,
    themeSettings,
    setThemeSettings,
    currentColor,
    currentMode,
  } = useStateContext();
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="settings" position="Top">
              <button
                type="button"
                className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
                style={{ background: currentColor, borderRadius: "50%" }}
                onClick={() => setThemeSettings(true)}
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? "dark:bg-main-dark-bg bg-main-bg min-h-screen md:ml-72 w-full"
                : "dark:bg-main-dark-bg bg-main-bg min-h-screen w-full flex-2"
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              {themeSettings && <ThemeSettings />}
              <Routes>
                {/* Auth */}
                <Route
                  path="/login"
                  exact
                  element={!authToken ? <Login /> : <Navigate to="/" />}
                />
                {/* Dashboard */}
                <Route path="/" element={<Ecommerce />} />
                <Route path="/ecommerce" element={<Ecommerce />} />

                {/* eCommerce */}
                <Route element={<RequireAuth allowedRoles={["1002"]} />}>
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/employees" element={<Employees />} />
                  <Route path="/customers" element={<Customers />} />
                  <Route path="/expenses" element={<Expenses />} />
                </Route>

                <Route path="/products" element={<Products />} />
{/* 
                <Route element={<RequireAuth allowedRoles={["1002"]} />}>
                  <Route
                    path="/products/new"
                    exact
                    element={
                      <New inputs={productInputs} title="Add New Product" />
                    }
                  />
                </Route> */}

                {/* Tools */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Info */}
                <Route path="/travel-advisor" element={<TravelAdvisor />} />
                <Route path="/crypto" element={<Crypto />} />
                <Route path="/real-estate" element={<RealEstate />} />
                <Route path="/blogs" element={<Blogs />} />

                {/* Charts */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
