import store from "@/context/store";
import { useState } from "react";
import { Spinner } from "../spinner";
import {
  CheckIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import DeleteModal from "../modal/DeleteModal";
import { useApproveUser } from "@/hooks/useGetUsers";

const TotalTableBody = ({
  element,
  handleOpen,
  editLoading, 
  header,
  handleDelete,
  deleteLoading,
  type,
}) => {
  const { sidenavType } = store();
  const [state, setState] = useState({
    clickedId: null,
    open: false,
  });
  const theme = {
    white: {
      text: "text-blue-gray-600",
      btnBg: "bg-white shadow-sm",
      bg: "bg-white shadow-sm",
    },
    dark: {
      text: "text-white",
      bg: "bg-[#111827]",
      btnBg: "bg-[#1F2937]",
    },
    transparent: {
      text: "black",
      bg: "bg-transparent",
    },
  };
  const currentColor = theme[sidenavType];
  const { mutate: approveUser, isPending: approveLoading } = useApproveUser();

  const deleteOpen = () => {
    setState((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  const handleDeleteItem = () => {
    handleDelete(state.clickedId);
    setState((prevState) => ({ ...prevState, open: false }));
  };

  return (
    <>
      <tr
        className={`${currentColor.btnBg} ${currentColor.text} overflow-x-auto`}
      >
        {Object.values(header).map((prop) =>
          prop.code !== "is_active" ? (
            <td key={prop.code} className="py-3 px-4">
              <div className="flex items-center gap-4">
                <Typography variant="small" className="text-xs font-medium capitalize">
                  {element[prop.code]}
                </Typography>
              </div>
            </td>
          ) : null,
        )}
        {type === "user" ? (
          <td className="py-3 px-4">
            <div className="flex items-center gap-4">
              <Typography
                variant="small"
                className={`text-xs font-medium ${
                  element.is_active ? "text-green-600" : "text-red-600"
                }`}
              >
                {element.is_active ? "Одобренный" : "Не одобренный"}
              </Typography>
            </div>
          </td>
        ) : null}
        <td className="py-3 px-4">
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-5 w-5 text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!editLoading) {
                  setState({ clickedId: element.id, open: state.open });
                  handleOpen(element);
                }
              }}
            >
              {editLoading && state.clickedId === element.id ? (
                <Spinner size={20} color={"#2196f3"} />
              ) : (
                <PencilSquareIcon />
              )}
            </div>

            <div
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!deleteLoading) {
                  setState({ clickedId: element.id, open: true });
                }
              }}
            >
              {deleteLoading && state.clickedId === element.id ? (
                <Spinner size={20} color={"#f44336"} />
              ) : (
                <TrashIcon />
              )}
            </div>

            {type === "user" ? (
              <div
                className="h-5 w-5 text-red-500 cursor-pointer"
                onClick={() => {
                  approveUser(element.id);
                }}
              >
                {approveLoading ? (
                  <Spinner size={20} color={"#4caf50"} />
                ) : (
                  <CheckIcon className="h-5 w-5 text-green-500 cursor-pointer" />
                )}
              </div>
            ) : null}
          </div>
        </td>
      </tr>
      <DeleteModal
        handleOpen={deleteOpen}
        handleDelete={handleDeleteItem}
        open={state.open}
      />
    </>
  );
};

export default TotalTableBody;
