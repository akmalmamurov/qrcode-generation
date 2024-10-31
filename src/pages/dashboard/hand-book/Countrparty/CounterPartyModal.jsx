import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import Modal from "@/widgets/modal/Modal";
import store from "@/context/store";
import { usegetCounterInfoWithInn } from "@/hooks";
import { Spinner } from "@/widgets/spinner";
const CounterPartyModal = (props) => {
  const {
    isModalOpen,
    element,
    handleOpen,
    addCounterparty,
    header,
    CounterPartyData,
    handleOpenShipmentModal,
  } = props;
  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm();
  const {
    sidenavType,
    setTableElement,
    innValue,
    setInnValue,
    setErrorInn,
    errorInn,
    themeColored,
  } = store();

  const currentColor = themeColored[sidenavType];
  const onSubmit = (data) => {
    handleOpen();
    const addedInnData = { ...data, inn: innValue };
    addCounterparty(addedInnData);
    setText("");
    if (handleOpenShipmentModal) {
      handleOpenShipmentModal();
    }
  };
  const {
    data,
    isPending,
    mutate: getDataWithInn,
  } = usegetCounterInfoWithInn();
  const [text, setText] = useState("");

  function getDataWithInnFunc() {
    const isFind = CounterPartyData.items.filter(
      (data) => data.inn === innValue,
    )[0];

    if (innValue === "") {
      setErrorInn({
        isError: true,
        errorText: "Please enter INN in INN field for get data with INN",
      });
    } else if (isFind) {
      setErrorInn({ errorText: "This inn already exist", isError: true });
    } else {
      setText("Создать");
      getDataWithInn(innValue);
      setErrorInn({ ...errorInn, isError: false });
    }
  }

  useEffect(() => {
    reset(element);
    reset();
  }, [element, isModalOpen, reset]);
  useEffect(() => {
    if (!isPending && data) {
      setTableElement(data);
    }
  }, [data, isPending, setTableElement]);

  function handleChange(e) {
    setInnValue(e.target.value);
  }

  return (
    <Dialog
      size="xl"
      open={isModalOpen}
      handler={handleOpen}
      onClose={() => reset(element)}
      className={`${currentColor.bg}`}
    >
      <DialogHeader className={`${currentColor.text} `}>
        {Object.keys(element).length !== 0 && text === ""
          ? "Обновлять "
          : "Создать "}
        нового контрагента
      </DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {Object.entries(header).map(([key, item]) =>
            item.type === "select" ? (
              <div
                className={`flex w-full items-center my-4 mr-4 ${currentColor.text}`}
                key={key}
              >
                <label htmlFor={key} className="min-w-fit mr-4">
                  {item.name}:
                </label>
                <Controller
                  name={key}
                  control={control}
                  defaultValue={element[key]}
                  render={({ field }) => (
                    <Select
                      label={item.name}
                      value={field.value}
                      className={`text-xs ${currentColor.text}`}
                      labelProps={{
                        className: `${currentColor.text}`,
                      }}
                      menuProps={{
                        className: `${currentColor.text} ${currentColor.bg}`,
                      }}
                      color="blue-gray"
                      onChange={(value) => field.onChange(value)}
                      error={errors[key] ? true : false}
                    >
                      {item.options.map((el, index) => (
                        <Option key={index} value={el}>
                          {el}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors[key] && (
                  <span className="text-red-500 text-sm">
                    {errors[key].message}
                  </span>
                )}
              </div>
            ) : null,
          )}
          <div className="flex flex-wrap justify-between">
            {Object.entries(header).map(([key, item]) =>
              item.type !== "select" ? (
                <div
                  className={`flex ${item.width} items-center  my-4`}
                  key={key}
                >
                  <label
                    htmlFor={key}
                    className={`min-w-fit mr-2  ${currentColor.text}`}
                  >
                    {item.name}:
                  </label>
                  <div className="w-full">
                    <Input
                      id={key}
                      placeholder={item.placeholder}
                      // label={item.name}
                      color={sidenavType === "dark" ? "white" : null}
                      type={item.type}
                      {...register(key)}
                      error={errors[key] ? true : false}
                      required={!item.disabled}
                    />
                  </div>
                </div>
              ) : null,
            )}
            <div className={`flex w-[45%] items-center  my-4`}>
              <label
                // htmlFor={key}
                className={`min-w-fit mr-2  ${currentColor.text}`}
              >
                ИНН:
              </label>
              <Input
                value={innValue}
                placeholder="987456321"
                onChange={(e) => {
                  handleChange(e);
                }}
                color={sidenavType === "dark" ? "white" : null}
                type="text"
                required={true}
                error={errors["inn"] ? true : false}
              />
            </div>
          </div>
          {errorInn.isError && (
            <div className="flex justify-end items-end col-span-2  text-red-800">
              <span>{errorInn.errorText}</span>
            </div>
          )}
          <div className="flex justify-end items-end col-span-2 mt-4">
            <Button
              variant="text"
              color="red"
              onClick={() => {
                handleOpen();
                if (handleOpenShipmentModal) {
                  handleOpenShipmentModal();
                }
              }}
              className="mr-1"
            >
              <span>Отменить</span>
            </Button>
            <Button
              className={`w-40 ${currentColor.btnBg} ${currentColor.text} mr-4`}
              onClick={() => {
                getDataWithInnFunc();
              }}
            >
              {isPending === true ? <Spinner size={15} /> : "Получать c ИНН"}
            </Button>
            <Button type="submit" variant="gradient" color="green">
              <span>
                {Object.keys(element).length !== 0 && text === ""
                  ? "Обновлять "
                  : "Создать "}
              </span>
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default CounterPartyModal;
