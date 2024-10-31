import store from "@/context/store";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import React from "react";

const ShipmentTable = ({ listData, header, handleOpen }) => {
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  return (
    <Card className="my-6 bg-transparent ">
      <CardBody
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "gray transparent",
        }}
        className=" overflow-x-scroll px-0 pt-0 pb-2 overflow-y-auto"
      >
        <table className="w-full min-w-[640px] text-white table-auto">
          <thead className={`bg-[#111827]`}>
            <tr>
              {header &&
                Object.values(header).map((el, index) => (
                  <th
                    key={index}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase"
                    >
                      {el.name}
                    </Typography>
                  </th>
                ))}
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase"
                >
                  Действия
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody className={`${currentColor.btnBg}`}>
            {listData.map((el, key) => (
              <tr
                key={key}
                className={`${currentColor.btnBg} ${currentColor.text} cursor-pointer`}
              >
                {Object.values(el).map((el, i) => (
                  <td key={i} className={`py-3 px-5 `}>
                    <div className="flex items-center gap-4">
                      <Typography
                        variant="small"
                        className="text-xs font-medium"
                      >
                        {el}
                      </Typography>
                    </div>
                  </td>
                ))}
                <td>
                  <div className="flex items-center justify-center gap-4">
                    <PencilSquareIcon
                      onClick={() => {
                        handleOpen(el);
                        console.log(el);
                      }}
                      className="h-5 w-5 text-blue-500 cursor-pointer"
                    />
                    <TrashIcon className="h-5 w-5 text-red-500 cursor-pointer" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
};

export default ShipmentTable;
