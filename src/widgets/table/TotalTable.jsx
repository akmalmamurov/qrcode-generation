import { Typography } from "@material-tailwind/react";
import React from "react";
import { Spinner } from "../spinner";
import TotalTableBody from "./TotalTableBody";

const TotalTable = (props) => {
  const {
    header,
    isloading,
    editLoading,
    data,
    handleOpen,
    handleDelete,
    searchData,
    deleteLoading,
    type,
  } = props;

  const filterHeader = Object.values(header).filter((el) => !el.disabled);
  return (
    <table className="w-full min-w-[640px] table-auto">
      <thead className="bg-[#111827] text-white">
        <tr>
          {Object.values(filterHeader).map((el, index) => (
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
          <th
            key="Действия"
            className="border-b border-blue-gray-50 py-3 px-5 text-left"
          >
            <Typography
              variant="small"
              className="text-[11px] font-bold uppercase"
            >
              Действия
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {isloading ? (
          <tr>
            <td colSpan="7" className="text-center py-3">
              <Spinner />
            </td>
          </tr>
        ) : (
          (searchData || data)?.items?.map((el, index) => (
            <TotalTableBody
              key={index}
              element={el}
              handleOpen={handleOpen}
              editLoading={editLoading}
              header={filterHeader}
              handleDelete={handleDelete}
              deleteLoading={deleteLoading}
              type={type}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default TotalTable;
