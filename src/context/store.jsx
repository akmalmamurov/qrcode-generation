import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
const store = create(
  persist(
    (set, get) => ({
      openSidenav: false,
      sidenavColor: "dark",
      isDark: false,
      tableElement: {},
      innValue: "",
      errorInn: {
        isError: false,
        errorText: "",
      },
      themeColored: {
        white: {
          text: "text-blue-gray-600",
          btnBg: "bg-white shadow-sm",
          bg: "bg-white shadow-sm",
          border: "border-black",
        },
        dark: {
          text: "text-white",
          bg: "bg-[#111827]",
          btnBg: "bg-[#1F2937]",
          border: "border-white",
        },
        transparent: {
          text: "black",
          bg: "bg-transparent",
        },
      },
      sidenavType: "white",
      transparentNavbar: true,
      fixedNavbar: false,
      openConfigurator: false,
      isModalOpen: false,
      drawerContent: [],
      showDrawer: false,
      modalForm: {},
      authenticated: false,
      user: null,
      isSuper: false,
      setIsDark: (value) => {
        set({ isDark: value });
      },
      setModalForm: (value) => {
        set({ modalForm: value });
      },
      handleOpenCounterPartyModal: (element) => {
        if (element) {
          set({ tableElement: element });
        } else {
          set({ tableElement: {} });
        }
        set({ isModalOpen: !get().isModalOpen });
        set({ errorInn: { isError: false, errorText: "" } });
      },
      setIsModalOpen: (value) => {
        set({ isModalOpen: value });
      },
      setErrorInn: (value) => {
        set({ errorInn: value });
      },
      setInnValue: (value) => {
        set({ innValue: value });
      },
      setTableElement: (value) => {
        set({ tableElement: value });
      },
      setOpenSidenav: (value) => {
        set({ openSidenav: value });
      },
      setDrawerContent: (value) => {
        set({ drawerContent: value });
      },
      setSidenavType: (value) => {
        set({ sidenavType: value });
      },
      setSidenavColor: (value) => {
        set({ sidenavColor: value });
      },
      setShowDrawer: (value) => {
        set({ showDrawer: value });
      },
      setTransparentNavbar: (value) => {
        set({ transparentNavbar: value });
      },
      setFixedNavbar: (value) => {
        set({ fixedNavbar: value });
      },
      setOpenConfigurator: (value) => {
        set({ openConfigurator: value });
      },
      loginSuccess: (user) => {
        set({ authenticated: true, user: user, isSuper: user.isSuper });
      },
      logout: () => {
        set({ authenticated: false, user: null, isSuper: false });
      },
    }),
    { name: "user-data", storage: createJSONStorage(() => localStorage) },
  ),
);

export default store;
