import { Routes, Route, Navigate } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { Sidenav, DashboardNavbar, Configurator } from "@/widgets/layout";
import routes from "@/routes";
import store from "@/context/store";
import React from "react";
import OrderDetails from "@/pages/dashboard/order/OrderDetails";

export function Dashboard() {
  const { sidenavType, setOpenConfigurator, isSuper } = store();

  const newRoutes = routes.map((route) => {
    if (route.layout === "dashboard") {
      return {
        ...route,
        pages: route.pages.filter((page) => {
          if (page.isSuper && !isSuper) {
            return false;
          }
          return true;
        }),
      };
    }
    return route;
  });

  return (
    <div
      className={`min-h-screen ${
        sidenavType === "dark" ? "bg-[#111827]" : "bg-blue-gray-50/50"
      }`}
    >
      <Sidenav
        routes={newRoutes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 ml-[4rem] xl:ml-[24rem]">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {newRoutes.map(({ layout, pages }) =>
            layout === "dashboard"
              ? pages.map(({ path, element, subpage }, index) => (
                  <React.Fragment key={path || index}>
                    <Route path={path} element={element} />
                    {subpage &&
                      subpage.map((el, subIndex) => (
                        <Route
                          key={`${path}${el.path || subIndex}`}
                          path={`${path}${el.path}`}
                          element={el.element}
                        />
                      ))}
                  </React.Fragment>
                ))
              : null,
          )}
          <Route path="orders/:id" element={<OrderDetails />} />

          <Route path="*" element={<Navigate to="home" replace />} />
        </Routes>
        {/* <div className="text-blue-gray-600">
          <Footer />
        </div> */}
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
