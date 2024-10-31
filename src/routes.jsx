import {
  HomeIcon,
  DocumentChartBarIcon,
  BookOpenIcon,
  ClipboardDocumentIcon,
  ChartBarIcon,
  ArrowDownCircleIcon,
  TruckIcon,
  MinusCircleIcon,
  CloudIcon,
  Cog8ToothIcon,
  ArrowLeftCircleIcon,
  ListBulletIcon,
  BuildingOffice2Icon,
  UserGroupIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/solid";
import { lazy } from "react";

const Home = lazy(() => import("@/pages/dashboard/home"));
const Nomenclature = lazy(() =>
  import("@/pages/dashboard/hand-book/nomenclature/Nomenclature"),
);
const Organizations = lazy(() =>
  import("@/pages/dashboard/hand-book/organizations/Organization"),
);
const Counterparty = lazy(() =>
  import("@/pages/dashboard/hand-book/Countrparty/Counterparty"),
);
const Orders = lazy(() => import("@/pages/dashboard/order/Orders"));
const Applications = lazy(() =>
  import("./pages/dashboard/applications/Applications"),
);
const Aggregation = lazy(() =>
  import("./pages/dashboard/aggregation/Aggregation"),
);
const Shipment = lazy(() => import("./pages/dashboard/shipment/Shipment"));
const ListOfUsers = lazy(() =>
  import("./pages/dashboard/hand-book/idon'tknowhowtoname/Users"),
);
const SignIn = lazy(() => import("./pages/auth/sign-in"));
const icon = {
  className: "w-5 h-5 text-inherit",
};
export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "Главная",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <DocumentChartBarIcon {...icon} />,
        name: "Документы",
        path: "/documents",
        element: <h1>Documents</h1>,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Справочник",
        path: "/hand-book",
        element: <div>Spravochnik</div>,
        subpage: [
          {
            icon: <ListBulletIcon {...icon} />,
            name: "Номенклатура",
            path: "/nomenclature",
            element: <Nomenclature />,
          },
          {
            icon: <BuildingOffice2Icon {...icon} />,
            name: "Организация",
            path: "/organizations",
            element: <Organizations />,
          },
          {
            icon: <UserGroupIcon {...icon} />,
            name: "Контуры ГИСМТ",
            path: "/gismt",
          },
          {
            icon: <CurrencyDollarIcon {...icon} />,
            name: "Контрагенты",
            path: "/agents",
            element: <Counterparty />,
          },
        ],
      },
      {
        icon: <ClipboardDocumentIcon {...icon} />,
        name: "Заказ",
        path: "/orders",
        element: <Orders />,
      },
      {
        icon: <ChartBarIcon {...icon} />,
        name: "Нанесение",
        path: "/applications",
        element: <Applications />,
      },
      {
        icon: <ArrowDownCircleIcon {...icon} />,
        name: "Агрегация",
        path: "/aggregation",
        element: <Aggregation />,
      },
      {
        icon: <TruckIcon {...icon} />,
        name: "Отгрузка",
        path: "/shipment",
        element: <Shipment />,
      },
      {
        icon: <MinusCircleIcon {...icon} />,
        name: "Списание",
        path: "/write-off",
        element: <div>Write of </div>,
      },

      {
        icon: <UserGroupIcon {...icon} />,
        name: "Пользователи",
        path: "/test-users",
        element: <ListOfUsers />,
        isSuper: true,
      },

      {
        icon: <CloudIcon {...icon} />,
        name: "Примерка",
        path: "/fitting",
        element: <div>Primerka</div>,
      },
      {
        icon: <Cog8ToothIcon {...icon} />,
        name: "Настройки",
        path: "/settings",
        element: <div>Nastroyka</div>,
      },
    ],
  },
  {
    title: "",
    layout: "auth",
    pages: [
      {
        icon: <ArrowLeftCircleIcon {...icon} />,
        name: "Logout",
        path: "/sign-in",
        element: <SignIn />,
      },
    ],
  },
];

export default routes;
