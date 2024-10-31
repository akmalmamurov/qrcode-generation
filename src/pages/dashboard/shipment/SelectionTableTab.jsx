import store from "@/context/store";
import { useFetchData } from "@/hooks/useFetchData";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const SelectionTableTab = () => {
  const [rows, setRows] = useState([]);
  const [idItems, setIdItems] = useState([]); // Fixed typo here
  const { data: NomenclatureData, isLoading } = useFetchData("nomenclature");
  const [isOpen, setIsOpen] = useState(false);

  const nomenclatureHeader = {
    name: {
      code: "name",
      type: "string",
      name: "Наименование",
      disabled: false,
    },
    gtin: { code: "gtin", type: "number", name: "GTIN", disabled: false },
    amount_in_package: {
      code: "amount_in_package",
      type: "number",
      name: "Количество в упаковке",
      disabled: false,
    },
    type: {
      code: "type",
      type: "select",
      options: [
        "Сигареты",
        "Алкогольная продукция (кроме пива)",
        "Пиво и пивные напитки",
        "Лекарственные средства",
        "Бытовая техника",
        "Вода и прохладительные напитки",
      ],
      name: "Тип товара",
      disabled: false,
    },
    package_type: {
      code: "package_type",
      type: "select",
      options: ["Потребительская", "Групповая", "Транспортная"],
      name: "Тип упаковки товара",
      disabled: false,
    },
    ikpu: { code: "ikpu", type: "number", name: "ИКПУ", disabled: false },
  };

  const handleOpenProducts = () => {
    setIsOpen((prev) => !prev);
  };

  const selectProduct = (id, item) => {
    if (idItems.includes(id)) {
      toast.error("This item has already been added", { zIndex: 500000000 });
    } else {
      setIdItems((prev) => [...prev, id]);
      setRows((prev) => [...prev, item]);
    }
  };

  const removeHandler = (id) => {
    setRows((prev) => prev.filter((item) => item.id !== id));
    setIdItems((prev) => prev.filter((itemId) => itemId !== id));
  };

  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];

  return (
    <div>
      <div
        className={`${currentColor.text} leading-[0.5rem] flex justify-end items-center mb-4`}
      >
        <Menu open={isOpen} handler={handleOpenProducts}>
          <MenuHandler>
            <Button
              className={`${currentColor.btnBg} ${currentColor.text}`}
              onClick={handleOpenProducts}
            >
              Добавить Товар
            </Button>
          </MenuHandler>
          <MenuList
            className={`absolute right-0 z-[55555522222] mt-0 w-48 origin-top-right rounded-md ${currentColor.btnBg}`}
          >
            {isLoading ? (
              <MenuItem>Loading...</MenuItem>
            ) : (
              <>
                {NomenclatureData.items.length === idItems.length ? (
                  <MenuItem>There is no product</MenuItem>
                ) : (
                  NomenclatureData.items.map(
                    (item) =>
                      !idItems.includes(item.id) && (
                        <MenuItem
                          key={item.id}
                          onClick={() => selectProduct(item.id, item)}
                        >
                          {item.name}
                        </MenuItem>
                      ),
                  )
                )}
              </>
            )}
          </MenuList>
        </Menu>
      </div>
      <div>
        <table className="w-full min-w-[640px] table-auto">
          <thead className="bg-[#111827] text-white">
            <tr>
              {Object.values(nomenclatureHeader).map((el) => (
                <th
                  key={el.code}
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
              <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                <Typography
                  variant="small"
                  className="text-[11px] font-bold uppercase"
                >
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td
                  colSpan={Object.keys(nomenclatureHeader).length + 1}
                  className="text-center py-4"
                >
                  No data available
                </td>
              </tr>
            ) : (
              rows.map((item) => (
                <tr
                  key={item.id}
                  className={`${currentColor.btnBg} ${currentColor.text} overflow-x-auto`}
                >
                  {Object.values(nomenclatureHeader).map((prop) => (
                    <td
                      key={`${item.id}-${prop.code}`}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase"
                      >
                        {item[prop.code]}
                      </Typography>
                    </td>
                  ))}
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-center gap-4">
                      <div
                        className="h-5 w-5 text-red-500 cursor-pointer"
                        onClick={() => removeHandler(item.id)}
                      >
                        <TrashIcon />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SelectionTableTab;
