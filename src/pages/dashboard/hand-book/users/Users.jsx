import { useState } from "react";
import { usersTableData } from "@/data";
import { Card, CardBody, Typography, Button } from "@material-tailwind/react";
import CreateNewUser from "./Modal";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import Table from "@/widgets/table/Table";
import store from "@/context/store";

export const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(!isModalOpen);
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];

  return (
    <div>
      <div className="flex gap-2 items-center my-6">
        <Button
          className={`min-w-fit ${currentColor.btnBg} ${currentColor.text}`}
          onClick={handleOpen}
        >
          Создать
        </Button>
        <Button
          className={`ml-2 min-w-fit ${currentColor.btnBg} ${currentColor.text}`}
        >
          <DocumentPlusIcon className=" w-4 h-4 text-green-500" />
        </Button>
      </div>
      {/* <Card className="my-6">
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 overflow-y-auto">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="bg-gray-900 text-white">
              <tr>
                {[
                  "Название линии",
                  "Тип сканирование",
                  "Адрес IPv4 1 камера:",
                  "Адрес IPv4 2 камера:",
                ].map((el) => (
                  <th
                    key={el}
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
            <tbody className="">
              {usersTableData.map(
                ({ lineName, typeOfScan, camera1, camera2 }, key) => {
                  const className = `py-3 px-5 ${
                    key === usersTableData.length - 1
                      ? ""
                      : "border-b border-blue-gray-50"
                  } `;

                  return (
                    <tr key={key} className="even:bg-gray-100">
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {lineName}
                          </Typography>
                        </div>
                      </td>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {typeOfScan}
                          </Typography>
                        </div>
                      </td>

                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {camera1}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography
                          variant="small"
                          className="text-xs font-medium text-blue-gray-600"
                        >
                          {camera2}
                        </Typography>
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
      </Card> */}
      <Table listData={usersTableData} />
      <CreateNewUser open={isModalOpen} handleOpen={handleOpen} />
    </div>
  );
};

export default Users;
