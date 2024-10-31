import React, { useEffect, useState } from "react";
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Select,
  Option,
  Typography,
  Checkbox,
  Tooltip,
  Dialog,
} from "@material-tailwind/react";

import Modal from "@/widgets/modal/Modal";
import { Controller, useForm } from "react-hook-form";
import store from "@/context/store";

import { CounterPartyHeader } from "@/data/counterparty-header";
import { DocumentPlusIcon } from "@heroicons/react/24/solid";
import { useFetchData } from "@/hooks/useFetchData";
function formatDate(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
const ShipmentModal = ({
  isModalOpen,
  onSubmit,
  handleOpen,
  element,
  org,
  setOrg,
}) => {
  const { handleSubmit, register, reset } = useForm({ defaultValues: element });

  const {
    sidenavType,
    themeColored,
    handleOpenCounterPartyModal,
    setModalForm,
    setInnValue,
  } = store();
  const { data: counterPartyData, isPending } = useFetchData("counterparty");
  const [counterReceiver, setCounterReceiver] = useState({
    inn: "",
    company_name: "",
    reg_code: "",
    check_acc: "",
    mfo: "",
    address: "",
    contract_number: "",
    contract_date: "",
  });

  const resetCounterReceiver = () => {
    setCounterReceiver({
      inn: "",
      company_name: "",
      reg_code: "",
      check_acc: "",
      mfo: "",
      address: "",
      contract_number: "",
      contract_date: "",
    });
  };

  const currentColor = themeColored[sidenavType];

  const handleSelected = (id) => {
    const clickedCounterparty = counterPartyData.items.find(
      (item) => item.id === id,
    );
    setCounterReceiver({
      inn: clickedCounterparty.inn,
      company_name: clickedCounterparty.name,
      reg_code: "",
      check_acc: clickedCounterparty.checking_account,
      mfo: clickedCounterparty.mfo,
      address: clickedCounterparty.address,
      contract_number: clickedCounterparty.contract_number,
      contract_date: formatDate(clickedCounterparty.contract_date),
    });
  };

  const handleOpenCounter = () => {
    handleOpenCounterPartyModal();
    setModalForm(CounterPartyHeader);
    setInnValue("");
    handleOpen();
    resetCounterReceiver();
  };

  useEffect(() => {
    resetCounterReceiver();
    reset(element);
  }, [element, reset]);

  return (
    <Dialog
      size="xl"
      open={isModalOpen}
      handler={handleOpen}
      onClose={() => reset(element)}
      className={`${currentColor.bg}`}
    >
      <DialogHeader className={`${currentColor.text} leading-[0.5rem]`}>
        Создать новую Отгрузка
      </DialogHeader>
      <DialogBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-wrap justify-between"
        >
          <div
            className={`flex w-full flex-wrap justify-between items-center my-2 gap-2 `}
          >
            <div className="w-[45%]">
              <Input
                label={"Номер счет-фактуры"}
                color={sidenavType === "dark" ? "white" : null}
                type="text"
              />
            </div>
            <div className="w-[45%]">
              <Input
                label={"Дата документа"}
                color={sidenavType === "dark" ? "white" : null}
                type="date"
              />
            </div>
            <div className="w-[45%]">
              <Input
                label={"Номер контракта"}
                color={sidenavType === "dark" ? "white" : null}
                value={counterReceiver.contract_number}
                onChange={(e) =>
                  setCounterReceiver({
                    ...counterReceiver,
                    contract_number: e.target.value,
                  })
                }
                type="text"
              />
            </div>
            <div className="w-[45%]">
              <Input
                label={"Дата контракта"}
                color={sidenavType === "dark" ? "white" : null}
                type="date"
                value={counterReceiver.contract_date}
                onChange={(e) =>
                  setCounterReceiver({
                    ...counterReceiver,
                    contract_date: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div
            className={`w-full h-2 ${
              sidenavType === "dark" ? currentColor.btnBg : "bg-gray-200"
            }`}
          ></div>
          <div className="flex w-full justify-between">
            <div className="w-[45%] flex justify-between flex-wrap">
              <Typography
                className={`${currentColor.text} font-bold w-full my-2`}
              >
                Ваши сведения
              </Typography>
              <div className="w-full flex">
                <Input
                  label="ИНН/ПИНФЛ"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={org?.inn || ""}
                  onChange={(e) => setOrg({ ...org, inn: e.target.value })}
                />
              </div>
              <div className="w-full mt-4">
                <Input
                  label="Статус: Плательщик НДС+(сертификат активный)"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                />
              </div>
              {org !== null && org.is_excise ? (
                <div className="flex items-center">
                  <Checkbox color="blue" />
                  <Typography className={`${currentColor.text}`}>
                    Акциз
                  </Typography>
                </div>
              ) : null}
              <Typography
                className={`${currentColor.text} font-bold w-full mb-2`}
              >
                Компания
              </Typography>
              <div className="w-full my-2">
                <Input
                  label="Название"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={org?.name || ""}
                  onChange={(e) => setOrg({ ...org, name: e.target.value })}
                />
              </div>
              <div className="w-full mb-2">
                <Input
                  label="Регистрационный код плательщика НДС"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  {...register("reg_code_sender")}
                />
              </div>
              <div className="w-[45%]">
                <Input
                  label="Расчетный счет"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={org?.checking_account || ""}
                  onChange={(e) =>
                    setOrg({ ...org, checking_account: e.target.value })
                  }
                />
              </div>
              <div className="w-[45%]">
                <Input
                  label="МФО, SWIFT и др"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={org?.mfo || ""}
                  onChange={(e) => setOrg({ ...org, mfo: e.target.value })}
                />
              </div>
              <div className="w-full mt-2">
                <Input
                  label="Адрес"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={org?.address || ""}
                  onChange={(e) => setOrg({ ...org, address: e.target.value })}
                />
              </div>
            </div>
            <div className="w-[45%] flex justify-between flex-wrap">
              <Typography
                className={`${currentColor.text} font-bold w-full my-2`}
              >
                Контрагент
              </Typography>
              <div className="w-full flex justify-between items-center mb-4">
                <Select
                  label="Список контрагентов"
                  color="blue-gray"
                  className={`text-sm ${currentColor.text}`}
                  labelProps={{ className: `${currentColor.text}` }}
                  menuProps={{
                    className: `${currentColor.text} ${currentColor.bg}`,
                  }}
                >
                  {isPending ? (
                    <>
                      <Option>Loading...</Option>
                      <Option>Loading...</Option>
                    </>
                  ) : (
                    counterPartyData.items.map((item) => (
                      <Option
                        key={item.id}
                        value={item.name}
                        onClick={() => handleSelected(item.id)}
                      >
                        {item.name}
                      </Option>
                    ))
                  )}
                </Select>

                <Tooltip
                  className={`${currentColor.text} ${currentColor.bg} z-[50000]`}
                  content={<Typography>Add counterparty</Typography>}
                >
                  <Button
                    onClick={handleOpenCounter}
                    className={`ml-2 min-w-fit ${currentColor.btnBg} ${currentColor.text}`}
                  >
                    <DocumentPlusIcon className="w-4 h-4 text-green-500" />
                  </Button>
                </Tooltip>
              </div>
              <div className="w-full">
                <Input
                  label="ИНН/ПИНФЛ"
                  value={counterReceiver.inn}
                  onChange={(e) =>
                    setCounterReceiver({
                      ...counterReceiver,
                      inn: e.target.value,
                    })
                  }
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                />
              </div>
              <Typography
                className={`${currentColor.text} font-bold w-full mb-2 mt-10`}
              >
                Компания контрагента
              </Typography>
              <div className="w-full my-2">
                <Input
                  label="Название"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={counterReceiver.company_name}
                  onChange={(e) =>
                    setCounterReceiver({
                      ...counterReceiver,
                      company_name: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full mb-2">
                <Input
                  label="Регистрационный код плательщика НДС"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={counterReceiver.reg_code}
                  onChange={(e) =>
                    setCounterReceiver({
                      ...counterReceiver,
                      reg_code: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-[45%]">
                <Input
                  label="Расчетный счет"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={counterReceiver.check_acc}
                  onChange={(e) =>
                    setCounterReceiver({
                      ...counterReceiver,
                      check_acc: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-[45%]">
                <Input
                  label="МФО, SWIFT и др"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={counterReceiver.mfo}
                  onChange={(e) =>
                    setCounterReceiver({
                      ...counterReceiver,
                      mfo: e.target.value,
                    })
                  }
                />
              </div>
              <div className="w-full mt-2">
                <Input
                  label="Адрес"
                  color={sidenavType === "dark" ? "white" : null}
                  type="text"
                  value={counterReceiver.address}
                  onChange={(e) =>
                    setCounterReceiver({
                      ...counterReceiver,
                      address: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-end items-end col-span-2 mt-4">
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1 ml-2"
            >
              <span>Отменить</span>
            </Button>
            <Button type="submit" variant="gradient" color="green">
              <span>
                {Object.keys(element).length === 0 ? "Создать" : "Обновлять"}
              </span>
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default ShipmentModal;
