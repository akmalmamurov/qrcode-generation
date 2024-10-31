import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { BackwardIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Drawer } from "./drawer";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import store from "@/context/store";

export function Sidenav({ brandName, routes }) {
  const signout = useSignOut();
  const {
    sidenavColor,
    sidenavType,
    openSidenav,
    setDrawerContent,
    drawerContent,
    setOpenSidenav,
    showDrawer,
    setShowDrawer,
    themeColored,
  } = store();

  const currentColor = themeColored[sidenavType];

  return (
    <aside
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "gray transparent",
      }}
      className={`${
        sidenavType === "dark" ? "bg-[#1F2937]" : null
      } overflow-y-auto overflow-scrolling-touch ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 
         text-${currentColor.text}
       h-[calc(100vh-32px)] w-[22rem] rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center">
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 rounded-xl grid rounded-br-none rounded-tl-none xl:hidden ${sidenavTypes[sidenavType]}   "
          onClick={() => setOpenSidenav(!openSidenav)}
        >
          <BackwardIcon
            strokeWidth={2.5}
            className={`h-5 w-5 ${currentColor.bg}  
            text-${currentColor.text}   duration-300 ${
              openSidenav ? "" : "rotate-180"
            }`}
          />
        </IconButton>
      </div>
      <div className="m-4 mt-0">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="flex flex-col">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, subpage }, index) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={sidenavType === "dark" ? "white" : "blue-gray"}
                      className={`flex ${currentColor.text} ${
                        isActive
                          ? sidenavType === "white"
                            ? "text-white"
                            : "text-[#1F2937]"
                          : sidenavType === "dark"
                          ? "white"
                          : "blue-gray"
                      } items-center gap-4 px-4 capitalize`}
                      fullWidth
                      onClick={() => {
                        if (subpage) {
                          setDrawerContent({ subpage, layout, path });
                          setShowDrawer(!showDrawer);
                        } else {
                          setShowDrawer(false);
                        }
                        if (name === "Logout") {
                          signout();
                        }
                      }}
                    >
                      {icon}
                      <Typography className="font-medium capitalize">
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
      {showDrawer && <Drawer />}
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
