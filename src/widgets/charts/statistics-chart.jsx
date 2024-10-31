import store from "@/context/store";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";

export function StatisticsChart({ chart, title, description, footer }) {
  const { sidenavType, themeColored } = store();
  const colors = {
    white: {
      text: "black",
      bg: "bg-white shadow-sm",
    },
    dark: {
      text: "white",
      bg: "bg-gradient-to-br from-gray-800 to-gray-900",
    },
    transparent: {
      text: "black",
      bg: "bg-transparent",
    },
  };
  const currentColor = themeColored[sidenavType];
  return (
    <Card
      className={`border ${currentColor.btnBg}  border-blue-gray-100 shadow-sm`}
    >
      <CardHeader
        className={currentColor.text}
        floated={false}
        shadow={false}
      >
        <Chart className={`${currentColor.btnBg} `} {...chart} />
      </CardHeader>
      <CardBody className="px-6  pt-0">
        <Typography variant="h6" className={currentColor.text}>
          {title}
        </Typography>
        <Typography variant="small" className={currentColor.text}>
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className={`border-t border-red-gray-50 px-6 py-5`}>
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.jsx";

export default StatisticsChart;
