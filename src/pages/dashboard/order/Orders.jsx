import { useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import store from "@/context/store";
import { useCreateData } from "@/hooks/useCreateData";
import { useFetchData } from "@/hooks/useFetchData";
import { orderHeader } from "@/data";
import OrderModal from "./OrderModal";
import OrderTable from "./OrderTable";
import Pagination from "@/widgets/pagination/Pagination";
import { LIMIT } from "@/constants/api";
import { Spinner } from "@/widgets/spinner";

export function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { sidenavType, themeColored, tableElement, setTableElement } = store();

  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setIsModalOpen(!isModalOpen);
  };

  const { data: Orders, isLoading, isPending } = useFetchData("order", page);
  const { mutate: createOrder } = useCreateData("order");
  const { data: nomenclatureData } = useFetchData("nomenclature");
  const onSubmit = (data) => {
    if (data.code) {
      const selectedOption = nomenclatureData?.items?.find(
        (item) => item.name === data.code,
      );
      data.code = selectedOption?.gtin || data.code;
    }
    const parsedData = {
      ...data,
      km_amount: Number(data.km_amount),
      method_si: "Самостоятельно",
      serial_num_creation_method: "Автоматически",
    };
    createOrder(parsedData);
    handleOpen();
  };

  const totalPages = Math.ceil((Orders?.count || 0) / LIMIT);
  const currentColor = themeColored[sidenavType];
  const classBtn = `min-w-fit ${currentColor.btnBg} ${currentColor.text}`;
  const filterHeader = Object.values(orderHeader).filter((el) => !el.disabled);

  return (
    <div>
      <div className="flex gap-2 items-center my-6">
        <Button className={classBtn} onClick={() => handleOpen({})}>
          Создать
        </Button>
        <Button className={classBtn}>Загрузить</Button>
        <Button className={classBtn} disabled>
          Скачать
        </Button>
        <Button className={classBtn}>Создать группу</Button>
        <Button className={classBtn}>Найти</Button>
      </div>
      <Card className="my-6 bg-transparent">
        <CardBody
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
          className="px-0 pt-0 pb-2 overflow-y-auto"
        >
          <table className="w-full min-w-[640px] table-auto">
            <thead className={`bg-[#111827] text-white`}>
              <tr>
                {filterHeader.map((el) => (
                  <th
                    key={el.name}
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
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    <Spinner size={30} />
                  </td>
                </tr>
              ) : Orders?.items?.length > 0 ? (
                Orders.items.map((el, index) => (
                  <OrderTable
                    key={index}
                    element={el}
                    editLoading={isPending}
                    data={Orders}
                    handleOpen={handleOpen}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    <Typography variant="h6" className="text-gray-500">
                      Заказов пока нет
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
        <Pagination totalPages={totalPages} page={page} setPage={setPage} />
      </Card>

      <OrderModal
        isModalOpen={isModalOpen}
        handleOpen={handleOpen}
        onSubmit={onSubmit}
        tableElement={tableElement}
      />
    </div>
  );
}

export default Orders;
