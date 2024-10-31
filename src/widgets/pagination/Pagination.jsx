import React from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import store from "@/context/store";

const Pagination = ({ page, setPage, totalPages }) => {
  const { sidenavType } = store();

  const colors = {
    white: {
      text: "text-blue-gray-600",
      pgBg: "bg-black",
      pgText: "text-white",
      btnBg: "bg-transparent shadow-sm",
      bg: "bg-transparent shadow-sm",
    },
    dark: {
      text: "text-white",
      bg: "bg-gray-900",
      pgBg: "bg-white",
      pgText: "text-black",
      btnBg: "bg-gradient-to-br from-gray-800 to-gray-900",
    },
    transparent: {
      text: "black",
      bg: "bg-transparent",
    },
  };
  const currentColor = colors[sidenavType];

  const getItemProps = (index) => ({
    variant: page === index ? "filled" : "text",
    color: "gray",
    onClick: () => setPage(index),
    disabled: totalPages === 0,
  });

  const next = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="flex items-center gap-4 justify-center my-2">
      <Button
        variant="text"
        className={`flex items-center gap-2 ${currentColor.text}`}
        onClick={prev}
        disabled={page === 1 || totalPages === 0}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <IconButton
            className={`${currentColor.pgBg} ${currentColor.pgText}`}
            key={index + 1}
            {...getItemProps(index + 1)}
          >
            {index + 1}
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className={`flex items-center gap-2 ${currentColor.text}`}
        onClick={next}
        disabled={page === totalPages || totalPages === 0}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
