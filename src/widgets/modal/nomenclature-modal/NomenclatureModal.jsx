import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  DialogBody,
  DialogHeader,
  Button,
  Input,
  Select,
  Option,
  Dialog,
} from "@material-tailwind/react";

import store from "@/context/store";
import NomenclatureModalBottom from "./NomenclatureModalBottom";

export const NomeclatureModal = (props) => {
  const { isModalOpen, submitData, handleOpen, header, element } = props;
  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: element });

  const { sidenavType, themeColored } = store();
  const [alcohol, setAlcohol] = useState(false);
  const [excise, setExcise] = useState(false);
  const [price, setPrice] = useState(null);
  const [aksiz, setAksiz] = useState(null);
  const [nds, setNds] = useState(null);
  const currentColor = themeColored[sidenavType];
  const [totalPrice, setTotalPrice] = useState(null);
  const ndsValue = watch("nds");

  const onSubmit = (data) => {
    data = {
      ...data,
      is_alcohol: alcohol,
      is_excise: excise,
      original_price: totalPrice,
      price,
    };
    console.log(data);
    const parsedData = {
      ...data,
      amount_in_package: parseInt(data.amount_in_package),
      expires_in: parseInt(data.expires_in),
      measurement_value: parseInt(data.measurement_value),
      measurement_min_value: parseInt(data.measurement_min_value),
      measurement_max_value: parseInt(data.measurement_max_value),
      nds: parseInt(data.nds),
      price: parseInt(data.price),
    };
    submitData(parsedData);
    handleOpen();
  };

  useEffect(() => {
    reset(element);
    reset();
    setAlcohol(false);
    setExcise(false);
    setPrice(null);
    setTotalPrice(null);
    setNds(null);
    setAksiz(null);
  }, [element, isModalOpen, reset]);
  useEffect(() => {
    if (ndsValue) {
      setNds(ndsValue);
    }
  }, [ndsValue]);

  useEffect(() => {
    let basePrice = parseFloat(price) || 0;
    let baseNds = parseFloat(nds) || 0;
    let baseExcise = parseFloat(aksiz) || 0;
    let baseTotal = basePrice + baseExcise;
    let baseWithoutAksiz = (baseTotal * baseNds) / 100;
    let baseTotalPrice = baseWithoutAksiz + baseTotal;
    setTotalPrice(baseTotalPrice);
  }, [price, nds, aksiz]);

  const rekvizity = {
    register,
    errors,
    control,
    alcohol,
    setAlcohol,
    excise,
    setExcise,
    setPrice,
    setAksiz,
  };
  return (
    <Dialog
      size="xl"
      open={isModalOpen}
      handler={handleOpen}
      onClose={() => reset(element)}
      className={`${currentColor.bg} h-[600px] xl:h-[725px] overflow-y-auto`}
    >
      <DialogHeader className={`${currentColor.text}`}>
        Номенклатура (создание)
      </DialogHeader>
      <DialogBody>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid2">
            {Object.entries(header).map(([key, item]) =>
              item.type === "select" ? (
                <div className={`flexCol ${currentColor.text}`} key={key}>
                  <label
                    htmlFor={item.name}
                    className={`label ${currentColor.text}`}
                  >
                    {item.name}:
                  </label>

                  <Controller
                    name={key}
                    control={control}
                    defaultValue={element[key]}
                    render={({ field }) => (
                      <Select
                        id={item.name}
                        label={item.name}
                        value={field.value}
                        className={`text-sm text-${currentColor.text}`}
                        labelProps={{ className: `text-${currentColor.text}` }}
                        menuProps={{
                          className: `text-${currentColor.text} ${currentColor.bg} `,
                        }}
                        color="blue-gray"
                        onChange={(value) => field.onChange(value)}
                        error={errors[key] ? true : false}
                      >
                        {item.options.map((el, index) => (
                          <Option key={index} value={el} className="text-sm capitalize">
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
          </div>
          <div className="grid3">
            {Object.entries(header).map(([key, item]) =>
              item.type !== "select" ? (
                <div className={`flexCol`} key={key}>
                  <label htmlFor={key} className={`label ${currentColor.text}`}>
                    {item.name}:
                  </label>
                  <div className="w-full">
                    <Input
                      id={key}
                      label={item.name}
                      color={sidenavType === "dark" ? "white" : null}
                      type={item.type}
                      {...register(key, {
                        required: "This field is required",
                        pattern:
                          item.type === "number"
                            ? {
                                value: /^[0-9]+$/,
                                message:
                                  "This field should contain only numbers",
                              }
                            : null,
                        minLength:
                          key === "gtin"
                            ? { value: 14, message: "GTIN must be 14 digits" }
                            : key === "code_tnwd"
                            ? {
                                value: 10,
                                message: "Код ТН ВЭД must be 10 digits",
                              }
                            : key === "ikpu"
                            ? { value: 17, message: "ИКПУ must be 17 digits" }
                            : null,
                        maxLength:
                          key === "gtin"
                            ? { value: 14, message: "GTIN must be 14 digits" }
                            : key === "code_tnwd"
                            ? {
                                value: 10,
                                message: "Код ТН ВЭД must be 10 digits",
                              }
                            : key === "ikpu"
                            ? { value: 17, message: "ИКПУ must be 17 digits" }
                            : null,
                      })}
                      error={errors[key] ? true : false}
                      required={!item.disabled}
                    />
                    {errors[key] && (
                      <span className="text-red-500 text-sm">
                        {errors[key].message}
                      </span>
                    )}
                  </div>
                </div>
              ) : null,
            )}
          </div>
          <NomenclatureModalBottom {...rekvizity} />
          <div className="between">
            <div className="flex">
              {totalPrice > 0 && (
                <div className="itemCenter gap-2">
                  <p className={`${currentColor.text}`}>Всего :</p>
                  <p
                    className={`border ${currentColor.text} py-1 px-4 rounded-md `}
                  >
                    <span
                      className={`${totalPrice === 0 ? "hidden" : "block"}`}
                    >
                      {totalPrice}
                    </span>
                  </p>
                </div>
              )}
            </div>
            <div className="flex justify-end items-end col-span-2 my-4 h-full">
              <Button
                variant="text"
                color="red"
                onClick={() => handleOpen({})}
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
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default NomeclatureModal;
