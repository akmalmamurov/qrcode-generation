import { Typography, IconButton, Button } from "@material-tailwind/react";
import { BackwardIcon } from "@heroicons/react/24/solid";
import { NavLink } from "react-router-dom";
import store from "@/context/store";
import routes from "@/routes";

export const Drawer = () => {
  const {
    sidenavType,
    showDrawer,
    setShowDrawer,
    drawerContent,
    themeColored,
  } = store();

  const currentColor = themeColored[sidenavType];

  // Map the invalid 'black' color to 'gray' for MaterialTailwind Button
  const mapColor = (color) => (color === "black" ? "gray" : color);

  return (
    <div
      className={` ${
        currentColor.btnBg
      } fixed top-0 right-0 h-[calc(100vh-32px)] w-[17.7rem] rounded-xl overflow-y-auto p-4 ${
        showDrawer ? "" : "opacity-0"
      }`}
      style={{
        transform: showDrawer ? "translateX(0)" : "translateX(100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div
        className="flex items-center p-4 pb-0"
        onClick={() => setShowDrawer(false)}
      >
        <IconButton
          variant="text"
          color="blue-gray"
          size="sm"
          ripple={false}
          className="mr-2"
          onClick={() => setShowDrawer(false)}
        >
          <BackwardIcon
            className={`h-5 w-5 ${
              sidenavType === "dark" ? "text-white" : "text-blue-gray-700"
            }`}
          />
        </IconButton>
        <Typography
          className={`font-bold text-xl ${
            sidenavType === "dark" ? "text-white" : "text-blue-gray-700"
          }`}
        >
          Назад
        </Typography>
      </div>
      <hr className="w-full h-1 my-4 bg-gray-100 border-0 rounded dark:bg-gray-700" />
      <ul className="list-none m-0 p-0">
        {routes[0].pages.map(
          ({ path, subpage }) =>
            path === drawerContent.path &&
            subpage.map(({ name, path, icon }, index) => (
              <NavLink to={`.${drawerContent.path}${path}`} key={index}>
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "gradient" : "text"}
                    key={index}
                    fullWidth
                    color={sidenavType === "dark" ? "white" : "blue-gray"}
                    className={`flex ${currentColor.text} ${
                      isActive
                        ? sidenavType === "white"
                          ? "text-white"
                          : "text-[#111827]"
                        : sidenavType === "dark"
                        ? "white"
                        : "blue-gray"
                    } items-center gap-4 px-4 capitalize cursor-pointer`}
                    // className="flex items-center  gap-4 py-2 pl-4 pr-6 my-8 rounded-lg "
                  >
                    {icon}
                    <Typography variant="paragraph" className="font-medium">
                      {name}
                    </Typography>
                  </Button>
                )}
              </NavLink>
            )),
        )}
      </ul>
    </div>
  );
};
