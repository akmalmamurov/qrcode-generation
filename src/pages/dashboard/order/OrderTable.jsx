import { Typography } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import store from "@/context/store";
import { Spinner } from "@/widgets/spinner";
import { useState } from "react";
import DeleteModal from "@/widgets/modal/DeleteModal";
import { useDelete } from "@/hooks/useDeleteData";
import { Link } from "react-router-dom";
import { formatTimestamp } from "@/utils";

const OrderTable = ({ element, handleOpen, loadingEdit }) => {
  const { sidenavType, themeColored } = store();
  const [clickedTrashId, setClickedTrashId] = useState(null);
  const [open, setOpen] = useState(false);

  const deleteOpen = () => {
    setOpen(!open);
  };

  const { mutate: deleteOrders, isPending: loadingDelete } = useDelete("order");

  const handleDeleteItem = () => {
    deleteOrders(clickedTrashId);
    setOpen(false);
  };

  const currentColor = themeColored[sidenavType];

  return (
    <>
      <tr
        className={`${currentColor.btnBg}  ${currentColor.text} overflow-x-auto`}
      >
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Link
              to={`/dashboard/orders/${element?.id}`}
              className="text-xs font-medium text-blue-500"
            >
              {element?.id}
            </Link>
          </div>
        </td>

        <td className="py-3 px-4">
          <Typography variant="small" className="text-xs font-medium">
            {element?.product_group}
          </Typography>
        </td>

        <td className="py-3 px-4">
          <Typography variant="small" className="text-xs font-medium">
            {formatTimestamp(element?.created_at)}
          </Typography>
        </td>
        <td className="py-3 px-4">
          <Typography variant="small" className="text-xs font-medium">
            {element?.km_amount}
          </Typography>
        </td>
        <td className="py-3 px-4">
          <Typography variant="small" className="text-xs font-medium">
            {element?.number_code || "-"}
          </Typography>
        </td>
        <td className="py-3 px-4">
          <Typography variant="small" className="text-xs font-medium">
            {element?.status || "-"}
          </Typography>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-5 w-5 text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!loadingEdit) {
                  setClickedTrashId(element?.ID);
                  handleOpen(element);
                }
              }}
            >
              {loadingEdit && clickedTrashId === element.id ? (
                <Spinner size={20} color={"#2196f3"} />
              ) : (
                <PencilSquareIcon />
              )}
            </div>

            <div
              className="h-5 w-5 text-red-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!loadingDelete) {
                  setClickedTrashId(element.id);
                  deleteOpen();
                }
              }}
            >
              {loadingDelete && clickedTrashId === element.ID ? (
                <Spinner size={20} color={"#f44336"} />
              ) : (
                <TrashIcon />
              )}
            </div>
          </div>
        </td>
      </tr>
      <DeleteModal
        handleOpen={deleteOpen}
        handleDelete={handleDeleteItem}
        open={open}
      />
    </>
  );
};

export default OrderTable;
