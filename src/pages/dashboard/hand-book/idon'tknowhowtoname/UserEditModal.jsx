import React, { useEffect } from "react";
import {
  Button,
  DialogBody,
  DialogHeader,
  Input,
  Option,
  Select,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import Modal from "@/widgets/modal/Modal";
import store from "@/context/store";
const UsersEditModal = (props) => {
  const { isModalOpen, element, handleOpen, editUser, header } = props;
  const {
    handleSubmit,
    reset,
    register,
    control,
    formState: { errors },
  } = useForm();
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  const onSubmit = (data) => {
    handleOpen();
    editUser(data);
  };

  useEffect(() => {
    reset(element);
    reset();
  }, [element, isModalOpen, reset]);
  return (
    <Modal
      onSubmit={handleSubmit(onSubmit)}
      open={isModalOpen}
      handleOpen={handleOpen}
    >
      <DialogHeader className={`${currentColor.text} `}>
        Создать нового контрагента
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
                      {...register(key)}
                      color="blue-gray"
                      onChange={(value) => field.onChange(value)}
                      error={errors[key] ? true : false}
                    >
                      {item.options.map((el, index) => (
                        <Option key={index}>{el}</Option>
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
                      label={item.name}
                      color={sidenavType === "dark" ? "white" : null}
                      type={item.type}
                      {...register(key)}
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

          <div className="flex justify-end items-end col-span-2 mt-4">
            <Button
              variant="text"
              color="red"
              onClick={() => {
                handleOpen();
              }}
              className="mr-1"
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
    </Modal>
  );
};

export default UsersEditModal;
