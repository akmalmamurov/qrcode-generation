import { Spinner } from "@material-tailwind/react";

const LazySpinner = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center z-[999]">
      <Spinner className="h-12 w-12" />
    </div>
  );
};

export default LazySpinner;
