import React, { useMemo } from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";
import { CheckCircleIcon, ClockIcon } from "@heroicons/react/24/solid";
import store from "@/context/store";

const Home = () => {
  const { sidenavType } = store();
  const statisticsCards = useMemo(
    () =>
      statisticsCardsData.map(({ color, icon, title, footer, ...rest }) => {
        const IconComponent = React.createElement(icon, {
          className: `w-6  h-6 ${
            sidenavType === "dark" ? "text-black" : "text-white"
          }`,
        });
        const FooterComponent = (
          <Typography
            className={`font-normal ${
              sidenavType === "dark" ? "text-white" : "text-blue-gray-600"
            }`}
          >
            <strong className={footer.color}>{footer.value}</strong>&nbsp;
            {footer.label}
          </Typography>
        );

        return (
          <StatisticsCard
            key={title}
            color={color}
            {...rest}
            title={title}
            icon={IconComponent}
            footer={FooterComponent}
          />
        );
      }),
    [statisticsCardsData],
  );

  const statisticsCharts = useMemo(
    () =>
      statisticsChartsData.map((props) => {
        const FooterComponent = (
          <Typography
            variant="small"
            className={`flex items-center font-normal ${
              sidenavType === "dark" ? "text-white" : "text-blue-gray-600"
            }`}
          >
            <ClockIcon strokeWidth={2} className="h-4 w-4" />
            &nbsp;{props.footer}
          </Typography>
        );

        return (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={FooterComponent}
          />
        );
      }),
    [statisticsChartsData],
  );

  return (
    <div className="mt-12 ">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4 p-">
        {statisticsCards}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsCharts}
      </div>
      <div className="flex justify-center">
        <img src="/img/homepage-image.png" alt="" />
      </div>
    </div>
  );
};

export default React.memo(Home);
