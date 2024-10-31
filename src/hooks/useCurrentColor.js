import store from "@/context/store";

export const useCurrentColor = () => {
  const { sidenavType, themeColored } = store();

  return themeColored[sidenavType];
};
