import { orderProductData } from "@/data";
import { useCurrentColor } from "@/hooks";
import { useDelete } from "@/hooks/useDeleteData";
import DeleteModal from "@/widgets/modal/DeleteModal";
import { Spinner } from "@/widgets/spinner";
import { PrinterIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderProduct = ({ order }) => {
  const currentColor = useCurrentColor();
  const [open, setOpen] = useState(false);
  const [clickedOrderId, setClickedOrderId] = useState(null);
  const { mutate: deleteOrders, isPending: loadingDelete } = useDelete("order");
  const navigate = useNavigate();
  const deleteOpen = (orderId) => {
    setClickedOrderId(orderId);
    setOpen(!open);
  };

  const handleDeleteItem = () => {
    deleteOrders(clickedOrderId);
    setOpen(false);
    navigate(-1);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="my-6">
      <Card className="my-6 bg-transparent">
        <CardBody
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
          className="px-0 pt-0 pb-2 overflow-y-auto"
        >
          <table className="w-full min-w-[640px] table-auto">
            <thead className={`bg-[#111827] text-white`}>
              <tr>
                {orderProductData.map((el, index) => (
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
              <tr
                className={`${currentColor.btnBg} ${currentColor.text} overflow-x-auto`}
              >
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.code}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.mark_type}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.all_code || "-"}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.received_code || "-"}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.rest_code || "-"}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.rate || "-"}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.status || "-"}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="h-5 w-5 cursor-pointer"
                      onClick={handlePrint}
                    >
                      <PrinterIcon className={currentColor.text} />
                    </div>

                    <div
                      className="h-5 w-5 text-red-500 cursor-pointer"
                      onClick={() => deleteOpen(order?.id)}
                    >
                      {loadingDelete && clickedOrderId === order?.id ? (
                        <Spinner size={20} color={"#f44336"} />
                      ) : (
                        <TrashIcon />
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
      <DeleteModal
        handleOpen={() => deleteOpen(null)}
        handleDelete={handleDeleteItem}
        open={open}
      />
    </div>
  );
};

export default OrderProduct;
