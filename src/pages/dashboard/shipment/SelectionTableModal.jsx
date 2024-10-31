import React from "react";
import {
  Dialog,
  Tabs,
  TabsHeader,
  Tab,
  TabsBody,
  TabPanel,
} from "@material-tailwind/react";
import store from "@/context/store";

import SelectionTableTab from "./SelectionTableTab";
import ScannerTab from "./ScannerTab";

const SelectionTableModal = ({ isModalOpen, handleOpen }) => {
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];

  return (
    <Dialog
      open={isModalOpen}
      handler={handleOpen}
      onClose={() => reset(element)}
      className={`${currentColor.bg} h-[95%]`}
      size="xl"
    >
      <Tabs value="SelectionTableTab" className="w-full">
        <TabsHeader>
          <Tab value="SelectionTableTab">Select Product</Tab>
          <Tab value="ScannerTab">Scanning Product</Tab>
        </TabsHeader>
        <TabsBody>
          <TabPanel value="SelectionTableTab">
            <SelectionTableTab />
          </TabPanel>
          <TabPanel value="ScannerTab">
            <ScannerTab />
          </TabPanel>
        </TabsBody>
      </Tabs>
    </Dialog>
  );
};

export default SelectionTableModal;
