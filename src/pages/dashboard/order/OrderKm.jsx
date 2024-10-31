import { orderKmData } from "@/data";
import { useCurrentColor } from "@/hooks";
import { formatTimestamp } from "@/utils";
import { PrinterIcon, TrashIcon } from "@heroicons/react/24/solid";
import { Card, CardBody, Typography } from "@material-tailwind/react";

const OrderKm = ({ order }) => {
  const currentColor = useCurrentColor();
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
                {orderKmData.map((el, index) => (
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
                    {order?.id}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {formatTimestamp(order?.created_at)}
                  </Typography>
                </td>
                <td className="py-3 px-4">
                  <Typography variant="small" className="text-xs font-medium">
                    {order?.received_code || "-"}
                  </Typography>
                </td>

                <td className="py-3 px-4">
                  <div className="h-5 w-5 cursor-pointer" onClick={handlePrint}>
                    <PrinterIcon className={currentColor.text} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
};

export default OrderKm;
