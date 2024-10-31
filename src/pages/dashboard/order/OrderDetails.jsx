import { useNavigate, useParams } from "react-router-dom";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import store from "@/context/store";
import useFetchDataById from "@/hooks/useFetchDataById";
import OrderInformation from "./OrderInformation";
import OrderProduct from "./OrderProduct";
import OrderKm from "./OrderKm";

const OrderDetails = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("information");
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  const { data: order, isError, isLoading } = useFetchDataById("order", id);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching order details</div>;

  const tabs = [
    {
      label: "Основная информация",
      value: "information",
      component: OrderInformation,
    },
    { label: "Товары", value: "product", component: OrderProduct },
    { label: "Полученные км", value: "km", component: OrderKm },
  ];

  const handleClose = () => navigate(-1);

  return (
    <div className="my-6">
      <Tabs value={activeTab} className="w-full">
        <TabsHeader
          className="rounded-none bg-transparent p-0 flex gap-2 w-[600px]"
          indicatorProps={{
            className: `bg-${currentColor.transparent} ${
              sidenavType === "white" ? "border-gray-900" : "border-white"
            } border-b-2 shadow-none rounded-none ${currentColor.text}`,
          }}
        >
          {tabs.map(({ label, value }) => (
            <Tab
              key={value}
              value={value}
              onClick={() => setActiveTab(value)}
              className={` ${currentColor.text} uppercase text-sm`}
            >
              {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabs.map(({ value, component: Component }) => (
            <TabPanel key={value} value={value} className="my-6">
              <div className="flex justify-between w-full">
                <h2 className={`${currentColor.text} font-semibold `}>
                  Номер заказа <span className="ml-1">{order?.id}</span>
                </h2>
                <Button
                  onClick={handleClose}
                  className={`${currentColor.btnBg} ${currentColor.text}`}
                >
                  Закрыть Заказа
                </Button>
              </div>
              <div className="my-6">
                <Component order={order} />
              </div>
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
};

export default OrderDetails;
