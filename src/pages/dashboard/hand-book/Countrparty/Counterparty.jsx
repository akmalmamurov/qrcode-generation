import React, { useState } from "react";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import store from "@/context/store";
import CounterPartyModal from "./CounterPartyModal";

import { CounterPartyHeader } from "@/data/counterparty-header";
import { Spinner } from "@/widgets/spinner";
import CounterPartyTable from "./CounterPartyTable";
import Pagination from "@/widgets/pagination/Pagination";
import { LIMIT } from "@/constants/api";
import { useFetchData } from "@/hooks/useFetchData";
import { useCreateData } from "@/hooks/useCreateData";

const Countrparty = () => {
  const {
    sidenavType,
    tableElement,
    setInnValue,
    themeColored,
    isModalOpen,
    modalForm,
    setModalForm,
    handleOpenCounterPartyModal,
  } = store();

  const [page, setPage] = useState(1);

  const currentColor = themeColored[sidenavType];

  const { data: CounterPartyData, isLoading } = useFetchData("counterparty");

  const { mutate: addCounterparty, isPending: loadingEdit } =
    useCreateData("counterparty");

  const totalPages = Math.ceil((CounterPartyData?.count || 0) / LIMIT);
  return (
    <div className="bg-transparent">
      <div
        className={`flex items-center ${currentColor.bg} rounded-md border-2 border-white-600 my-2 font-medium p-3`}
      >
        <Button
          className={`min-w-fit ${currentColor.btnBg} ${currentColor.text}`}
          onClick={() => {
            handleOpenCounterPartyModal();
            setModalForm(CounterPartyHeader);
            setInnValue("");
          }}
        >
          Создать
        </Button>
      </div>
      <Card className="my-6 bg-transparent">
        <CardBody
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
          className="px-0 pt-0 pb-2 overflow-y-auto"
        >
          <table className="w-full min-w-[640px] table-auto">
            <thead className={`bg-[#111827] text-white`}>
              <tr>
                {Object.values(CounterPartyHeader).map((el) => (
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
                  key="ИНН"
                  className="border-b border-blue-gray-50 py-3 px-5 text-left"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase"
                  >
                    ИНН
                  </Typography>
                </th>
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
                    <Spinner />
                  </td>
                </tr>
              ) : (
                CounterPartyData?.items?.map((el, index) => (
                  <CounterPartyTable
                    key={index}
                    element={el}
                    loadingEdit={loadingEdit}
                    setModalForm={setModalForm}
                    handleOpen={handleOpenCounterPartyModal}
                  />
                ))
              )}
            </tbody>
          </table>
        </CardBody>
        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </Card>
      <CounterPartyModal
        header={modalForm}
        CounterPartyData={CounterPartyData}
        addCounterparty={addCounterparty}
        isModalOpen={isModalOpen}
        element={tableElement}
        handleOpen={handleOpenCounterPartyModal}
      />
    </div>
  );
};

export default Countrparty;
