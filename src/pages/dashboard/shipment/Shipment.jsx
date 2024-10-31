import React, { useState } from "react";
import ShipmentModal from "./ShipmentModal";
import shipmentTableData from "@/data/shipment-table-data";
import shipmentHeader from "@/data/shipmentHeader";
import store from "@/context/store";
import { Button } from "@material-tailwind/react";
import ShipmentTable from "./ShipmentTable";
import CounterPartyModal from "../hand-book/Countrparty/CounterPartyModal";
import { useFetchData } from "@/hooks/useFetchData";
import { useCreateData } from "@/hooks/useCreateData";
import TotalTable from "@/widgets/table/TotalTable";
import { useDelete } from "@/hooks/useDeleteData";
import SelectionTableModal from "./SelectionTableModal";
const Shipment = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectionModalOpen, setIsSelectionModalOpen] = useState(false);
  const handleSelectionModal = () => {
    setIsSelectionModalOpen(!isSelectionModalOpen);
  };
  const [tableElement, setTableElement] = useState({});
  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setIsModalOpen(!isModalOpen);
  };
  const { data: fetchingOrganizationData, isPending: orgPending } =
    useFetchData("organization");
  const [org, setOrg] = useState(null);

  const handleGetOrganization = () => {
    if (orgPending) {
      console.log("isloading...");
    } else {
      setOrg(fetchingOrganizationData.items[0] || null);
    }
  };
  const {
    sidenavType,
    themeColored,
    modalForm,
    isModalOpen: isModalOpenCounterParty,
    tableElement: CounterPartyTableElement,
    handleOpenCounterPartyModal,
  } = store();
  const currentColor = themeColored[sidenavType];
  const onSubmit = (data) => {
    handleOpen();
    handleSelectionModal();
    console.log(data);
  };
  const {
    data: CounterPartyData,
    isloading,
    isPending: editLoading,
  } = useFetchData("counterparty");
  const { mutate: addCounterparty } = useCreateData("counterparty");
  const { mutate: deleteCounterParty, isPending: deleteLoading } =
    useDelete("counterparty");
  return (
    <div className={"bg-transparent"}>
      <div
        className={`flex items-center rounded-md ${currentColor.bg} border-2 border-white-600 my-2 font-medium p-3`}
      >
        <Button
          className={`min-w-fit ${currentColor.btnBg} ${currentColor.text}`}
          onClick={() => {
            handleGetOrganization();
            handleOpen();
          }}
        >
          Создать
        </Button>
      </div>

      <ShipmentTable
        handleOpen={handleOpen}
        listData={shipmentTableData}
        header={shipmentHeader}
      />
      {/* <TotalTable
        header={shipmentHeader}
        isloading={isloading}
        editLoading={editLoading}
        data={shipmentTableData}
        handleOpen={handleOpen}
        handleDelete={deleteCounterParty}
        deleteLoading={deleteLoading}
      /> */}

      <ShipmentModal
        element={tableElement}
        header={shipmentHeader}
        isModalOpen={isModalOpen}
        handleOpen={handleOpen}
        onSubmit={onSubmit}
        org={org}
        setOrg={setOrg}
      />
      <CounterPartyModal
        header={modalForm}
        CounterPartyData={CounterPartyData}
        addCounterparty={addCounterparty}
        isModalOpen={isModalOpenCounterParty}
        element={CounterPartyTableElement}
        handleOpen={handleOpenCounterPartyModal}
        handleOpenShipmentModal={handleOpen}
      />
      <SelectionTableModal
        isModalOpen={isSelectionModalOpen}
        handleOpen={handleSelectionModal}
      />
    </div>
  );
};

export default Shipment;
