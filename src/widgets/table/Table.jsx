import store from "@/context/store";
import Modal from "../modal/Modal";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

const Table = ({ listData, header }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState({});
  const handleOpen = (content) => {
    setContent(content);
    setIsModalOpen(!isModalOpen);
  };

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
        <table className="w-full min-w-[640px] table-auto">
          <thead className="bg-[#111827] text-white">
            <tr>
              {header &&
                Object.keys(header).map((el, index) => (
                  <th
                    key={index}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
            </tr>
          </thead>
          <tbody className={`${currentColor.btnBg }`}>
            {listData.slice(1, listData.lenth).map((el, key) => (
              <tr
                key={key}
                className={` ${currentColor.text} cursor-pointer`}
                onClick={() => handleOpen(el)}
              >
                {Object.values(el).map((el) => (
                  <td key={el} className={`py-3 px-5 `}>
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
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
      <Modal content={content} open={isModalOpen} handleOpen={handleOpen} />
    </Card>
  );
};

export default Table;
