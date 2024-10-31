import store from "@/context/store";
import { Typography } from "@material-tailwind/react";

export const TypographyText = ({ children }) => {
    const { sidenavType, theme } = store();
  const currentColor = theme[sidenavType];
  return (
    <Typography variant="small" className={`text-xs font-medium ${currentColor.text}`}>
      {children}
    </Typography>
  );
};

export default TypographyText;
