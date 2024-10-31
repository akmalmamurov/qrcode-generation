import store from "@/context/store";
import { agregationHeader, projectsTableData } from "@/data";
import Table from "@/widgets/table/Table";
import { TrashIcon } from "@heroicons/react/24/solid";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import useScanDetection from "use-scan-detection-react18";
import useWebSocket from "@/hooks/useWebSocket";
import * as API from "@/constants/api";

const ScannerTab = () => {
  const { register, handleSubmit } = useForm();
  const [quantityOfAggregation, setQuantityOfAggregation] = useState(0);
  const [barcodeScanTable, setBarcodeScanTable] = useState([]);
  const { messages, sendMessage, isOpen } = useWebSocket(API.SOCKET_URL);

  const onSubmit = (data) => {
    setQuantityOfAggregation(data.quantityOfAggregation);
  };
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];

  const handleScanComplete = (scanResult) => {
    const cleanString = scanResult.replace(/Shift/g, "").replace(/F8/g, "");

    setBarcodeScanTable([...barcodeScanTable, cleanString]);

    const jsonData = JSON.stringify({
      event: "newScan",
      data: {
        gtin: cleanString,
        token: API.TOKEN,
      },
    });

    sendMessage(jsonData);
  };

  useScanDetection({
    onComplete: handleScanComplete,
  });
  const checkStatus = () => {
    const jsonData = JSON.stringify({
      event: "newScan",
      data: {
        gtin: `010478001518007721nZIV-&*UtCOwO`,
        token: API.TOKEN,
      },
    });
    sendMessage(jsonData);
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit(onSubmit)} className="my-4 mx-auto w-[90%]">
        <div className="flex gap-2 items-center">
          <label
            htmlFor="Товарная группа:"
            className={`min-w-fit ${currentColor.text}`}
          >
            Количество в упаковке:
          </label>
          <div className="w-72">
            <Input
              label="Количество в упаковке"
              type="number"
              color={sidenavType === "dark" ? "white" : null}
              {...register("quantityOfAggregation")}
            />
          </div>
          <Button className="bg-blue-gray-700">+</Button>
          <Button className="bg-blue-gray-700">-</Button>
          <Button className="bg-blue-gray-500 min-w-fit" type="submit">
            Apply
          </Button>
          <Button className="bg-green-500 min-w-fit" onClick={checkStatus}>
            Проверить статус
          </Button>
        </div>
      </form>
      <div className="overflow-auto max-h-[75vh]">
        <table className="w-full min-w-[640px] table-auto">
          <thead className="bg-[#111827] text-white">
            <tr>
              {Object.keys(agregationHeader).map((el, index) => (
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
            </tr>
          </thead>
          <tbody>
            {messages.map((d, index) => {
              const data = d[0].cisInfo;
              console.log(data.status);
              return (
                <tr key={index}>
                  <td className="py-2 px-4">{data?.brand}</td>
                  <td className="py-2 px-4">{data?.cis}</td>
                  <td className="py-2 px-4">{data?.emissionType}</td>
                  <td className="py-2 px-4">{data?.gtin}</td>
                  <td className="py-2 px-4">{data?.ownerInn}</td>
                  <td className="py-2 px-4">{data?.ownerName}</td>
                  <td className={`py-2 px-4 min-w-[120px] text-center`}>
                    <span
                      className={`inline-block px-2 py-0.5 ${
                        data?.status === "EMITTED"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : data?.status === "Progress"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                          : data?.status === "Error"
                          ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
                      } text-xs font-medium rounded-full`}
                    >
                      {data?.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{data?.packageType}</td>
                  <td className="py-2 px-4">{data?.producerInn}</td>
                  <td className="py-2 px-4">{data?.productGroup}</td>
                  <td className="py-2 px-4">{data?.productGroupId}</td>
                  <td className="py-2 px-4">{data?.productName}</td>
                  <td className="py-2 px-4">{data?.requestedCis}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScannerTab;
