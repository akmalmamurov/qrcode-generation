import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import store from "@/context/store";
import { orderHeader } from "@/data";
import { useFetchData } from "@/hooks/useFetchData";

const OrderModal = ({ isModalOpen, handleOpen, onSubmit, tableElement }) => {
  const {
    handleSubmit,
    register,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { sidenavType, themeColored } = store();
  const { data: organizationData } = useFetchData("organization");
  const { data: nomenclatureData } = useFetchData("nomenclature");
  const uniqueDepartments = [];
  organizationData?.items?.forEach((el) => {
    if (!uniqueDepartments.includes(el.department)) {
      uniqueDepartments.push(el.department);
    }
  });

  orderHeader.product_group.options = uniqueDepartments;
  orderHeader.code.options = nomenclatureData?.items?.map(
    (item) => item.name,
  ) || ["Please create nomenclature first"];
  const director = organizationData?.items[0].director;
  const currentColor = themeColored[sidenavType];

  useEffect(() => {
    reset(tableElement);
  }, [handleOpen, isModalOpen, tableElement, reset]);

  return (
    <Dialog
      size="xl"
      open={isModalOpen}
      handler={handleOpen}
      onClose={() => reset(tableElement)}
      className={`${currentColor.bg}`}
    >
      <DialogHeader className={`${currentColor.text}`}>
        Заказ (создание)
      </DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="grid3 gap-4">
            {Object.entries(orderHeader).map(([key, item]) => {
              if (!item.type) return null;

              return item.type === "select" ? (
                <div
                  className={`flex flex-col mb-4 ${currentColor.text}`}
                  key={key}
                >
                  <label
                    htmlFor={item.name}
                    className={`min-w-fit mb-2 ${currentColor.text}`}
                  >
                    {item.name}:
                  </label>
                  <Controller
                    name={key}
                    control={control}
                    rules={{ required: `${item.name} не может быть пустым` }}
                    defaultValue={key !== "product_group" && key !== "code" ? item.options[0] : ""}
                    render={({ field }) => (
                      <Select
                        id={item.name}
                        label={item.name}
                        value={
                          field.value?.toString() ||
                          tableElement[key]?.toString()
                        }
                        className={`text-sm text-${currentColor.text}`}
                        labelProps={{
                          className: `${currentColor.text} ${
                            errors[key] ? "text-red-500" : ""
                          }`,
                        }}
                        menuProps={{
                          className: `${currentColor.text} ${currentColor.bg}`,
                        }}
                        color="blue-gray"
                        onChange={(value) => {
                          field.onChange(value);
                        }}
                        error={errors[key] ? true : false}
                      >
                        {item.options.map((option, index) => (
                          <Option
                            key={index}
                            value={option.toString()}
                            className="text-sm"
                          >
                            {option}
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
              ) : (
                <div className={`flex items-start flex-col `} key={key}>
                  <label
                    htmlFor={key}
                    className={`min-w-fit mb-2 ${currentColor.text}`}
                  >
                    {item.name}:
                  </label>
                  <div className="w-full">
                    {key === "contant_person" ? (
                      <Input
                        error={errors[key] ? true : false}
                        id={key}
                        label={item.name}
                        value={director}
                        color={sidenavType === "dark" ? "white" : "blue-gray"}
                        type={item.type}
                        {...register(key, {
                          required: `${item.name} не может быть пустым`,
                        })}
                      />
                    ) : (
                      <Input
                        error={errors[key] ? true : false}
                        id={key}
                        label={item.name}
                        color={sidenavType === "dark" ? "white" : "blue-gray"}
                        type={item.type}
                        {...register(key, {
                          required: `${item.name} не может быть пустым`,
                        })}
                      />
                    )}
                    {errors[key] && (
                      <span className="text-red-500 text-sm">
                        {errors[key].message}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-end items-end col-span-2 mt-4">
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen({})}
              className="mr-1"
            >
              <span>Отменить</span>
            </Button>
            <Button type="submit" variant="gradient" color="green">
              <span>
                {Object.keys(tableElement).length === 0
                  ? "Создать"
                  : "Обновлять"}
              </span>
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default OrderModal;
