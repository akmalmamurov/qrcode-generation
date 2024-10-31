import { Typography } from "@material-tailwind/react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import store from "@/context/store";
import { CounterPartyHeader } from "@/data/counterparty-header";
import { Spinner } from "@/widgets/spinner";
import { useState } from "react";
import DeleteModal from "@/widgets/modal/DeleteModal";
import { useDelete } from "@/hooks/useDeleteData";

const CounterPartyTable = ({
  element,
  handleOpen,
  setModalForm,
  loadingEdit,
}) => {
  const { sidenavType, setInnValue, themeColored } = store();
  const [clickedTrashId, setClickedTrashId] = useState(null);
  const [open, setOpen] = useState(false);
  const deleteOpen = () => {
    setOpen(!open);
  };

  const { mutate: deleteCounterparty, isPending: loadingDelete } =
    useDelete("counterparty");

  const handleDeleteItem = () => {
    deleteCounterparty(clickedTrashId);
    setOpen(false);
  };
  const currentColor = themeColored[sidenavType];
  return (
    <>
      <tr
        className={`${currentColor.btnBg}  ${currentColor.text} overflow-x-auto `}
      >
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.contract_date}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.contract_number}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.checking_account}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.mfo}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.name}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.phone}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.director}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.address}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center gap-4">
            <Typography variant="small" className="text-xs font-medium">
              {element.inn}
            </Typography>
          </div>
        </td>
        <td className="py-3 px-4">
          <div className="flex items-center justify-center gap-4">
            <div
              className="h-5 w-5 text-blue-500 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!loadingEdit) {
                  setClickedTrashId(element.ID);
                  handleOpen(element);
                  setModalForm(CounterPartyHeader);
                  setInnValue(element.inn);
                }
              }}
            >
              {loadingEdit && clickedTrashId === element.ID ? (
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
                  setClickedTrashId(element.ID);
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

export default CounterPartyTable;
