import React, { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { IconButton, Switch, Typography } from "@material-tailwind/react";
import store from "@/context/store";

export function Configurator() {
  const {
    openConfigurator,
    sidenavType,
    fixedNavbar,
    setFixedNavbar,
    setSidenavType,
    setOpenConfigurator,
    themeColored,
    isDark,
    setIsDark,
  } = store();

  function themeFunc() {
    if (isDark) {
      setSidenavType("dark");
    } else {
      setSidenavType("white");
    }
  }

  const currentColor = themeColored[sidenavType];

  useEffect(() => {
    themeFunc();
  }, [isDark]);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 ${
        currentColor.bg
      } px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
    >
      <div
        className={`flex items-start justify-between px-6 pt-8 pb-6 ${currentColor.text}`}
      >
        <div>
          <Typography variant="h5">Dashboard Configurator</Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className={`${currentColor.text}`}
          onClick={() => setOpenConfigurator(false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="px-6">
        <hr />
        <div className={` ${currentColor.text}`}>
          <div className=" flex items-center justify-between py-5">
            <Typography variant="h6">Dark Mode</Typography>
            <Switch
              value={isDark}
              onChange={() => {
                setIsDark(!isDark);
              }}
            />
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div
            className={`${currentColor.text} flex items-center justify-between py-5`}
          >
            <Typography variant="h6">Navbar Fixed</Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(!fixedNavbar)}
            />
          </div>
          <hr />
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.jsx";

export default Configurator;
