import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  DialogBody,
  DialogHeader,
  Button,
  Input,
  Select,
  Option,
  Dialog,
} from "@material-tailwind/react";

import Modal from "@/widgets/modal/Modal";
import store from "@/context/store";
import { organizationHeader } from "@/data";

const OrganizationModal = (props) => {
  const { isModalOpen, onSubmit, handleOpen, element } = props;
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  console.log(element);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    reset(element);
    reset();
  }, [handleOpen, isModalOpen, element, reset]);
  // const onSubmit = (data) => {
  //   console.log(data);
  //   submitData(data);
  //   handleOpen();
  // };

  return (
    <Dialog
      size="xl"
      open={isModalOpen}
      handler={handleOpen}
      onClose={() => reset(element)}
      className={`${currentColor.bg}`}
    >
      <DialogHeader
        className={`${currentColor.bg} ${currentColor.text}`}
      >
        Организация (создание)
      </DialogHeader>
      <DialogBody className={`${currentColor.bg}`}>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          {Object.entries(organizationHeader).map(([key, item]) =>
            item.type === "select" ? (
              <div
                key={key}
                className={`flex flex-col mb-4 ${currentColor.text}`}
              >
                <label htmlFor={item.name} className="label">
                  {item.name}:
                </label>
                <Controller
                  name={key}
                  control={control}
                  defaultValue={item[0]}
                  render={({ field }) => (
                    <Select
                      id={item.name}
                      label={item.name}
                      value={field.value}
                      className={`text-sm ${currentColor.text}`}
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
          <div className="grid4">
            {Object.entries(organizationHeader).map(([key, item]) =>
              item.type !== "select" ? (
                <div className={`flex flex-col`} key={key}>
                  <label htmlFor={key} className={`label ${currentColor.text}`}>
                    {item.name}:
                  </label>
                  <div>
                    {key === "phone" ? (
                      <Controller
                        name={key}
                        control={control}
                        defaultValue="+998"
                        rules={{
                          required: `${item.name} не может быть пустым`,
                          pattern: {
                            value: /^(\+998)[0-9]{9}$/,
                            message: "Некорректный номер телефона",
                          },
                        }}
                        render={({ field }) => (
                          <Input
                            {...field}
                            id={key}
                            label={item.name}
                            color={sidenavType === "dark" ? "white" : null}
                            type={item.type}
                            onChange={(e) => {
                              const value = e.target.value.replace(
                                /[^0-9+]/g,
                                "",
                              );
                              field.onChange(value);
                            }}
                          />
                        )}
                      />
                    ) : (
                      <Input
                        id={key}
                        defaultValue={item?.value || null}
                        label={item.name}
                        color={sidenavType === "dark" ? "white" : null}
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
              ) : null,
            )}
            <div className="flex flex-col">
              <label
                htmlFor="edoDidox"
                className={`label ${currentColor.text}`}
              >
                ЭДО Didox
              </label>
              <Controller
                name="edoDidox"
                control={control}
                render={({ field }) => (
                  <Select
                    id="edoDidox"
                    className={`text-sm ${currentColor.text}`}
                    value={field.value}
                    onChange={field.onChange}
                    ref={field.ref}
                    menuProps={{
                      className: `${currentColor.text} ${currentColor.bg}`,
                    }}
                    labelProps={{
                      className: `${currentColor.text}`,
                    }}
                    color="blue-gray"
                    label="ЭДО Didox"
                  >
                    <Option value="didox">didox.uz</Option>
                    <Option value="faktura">faktura.uz</Option>
                    <Option value="newsoliqservis">new.soliqservis.uz</Option>
                  </Select>
                )}
              />
            </div>
            <div className="flex  flex-col ">
              <label htmlFor="edo" className={`label ${currentColor.text}`}>
                Оператор ЭДО:
              </label>

              <Input
                className="w-full"
                id="edo"
                color={sidenavType === "dark" ? "white" : null}
                label="Оператор ЭДО"
                {...register("edo_operator")}
              />
            </div>
          </div>
          <div className="flex justify-end items-end col-span-2 mt-4">
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

export default OrganizationModal;
