import store from "@/context/store";
import {
  Dialog,
  DialogBody,
  DialogHeader,
  Select,
  Input,
} from "@material-tailwind/react";

import React from "react";
import { useForm } from "react-hook-form";

const Modal = ({ open, handleOpen, children, content, onSubmit }) => {
  const { sidenavType } = store();
  const { handleSubmit, register } = useForm();
  return (
    <Dialog
      open={open}
      handler={handleOpen}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      size="xl"
      className={`p-2 ${sidenavType === "dark" ? "bg-gray-900" : null}`}
    >
      {!content ? (
        children
      ) : (
        <>
          <DialogHeader>{content?.name || ""}</DialogHeader>

          <DialogBody>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="flex items-center my-4 flex-wrap">
                {Object.entries(content).map((item, index) => (
                  <div key={index} className=" ml-4 flex items-center mb-4">
                    <label htmlFor="Товарная группа:" className="min-w-fit">
                      {item[0]}:
                    </label>
                    <div className="w-48 ml-4">
                      <Input
                        // label={item[1]}
                        onChange={(e) => (item[1] = e.target.value)}
                        value={item[1]}
                        {...register("quantityOfAggregation")}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center my-4">
                <label htmlFor="Товарная группа:" className="min-w-fit">
                  Код:
                </label>
                <div className="w-48 ml-4">
                  <Input
                    label="Количество в упаковке"
                    type="number"
                    {...register("quantityOfAggregation")}
                  />
                </div>
                <label htmlFor="Товарная группа:" className="min-w-fit ml-8">
                  Код организации во внешней БД:
                </label>
                <div className="w-full ml-4">
                  <Input
                    label="Количество в упаковке"
                    type="number"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
              <div className="flex items-center my-4">
                <label htmlFor="Товарная группа:" className="min-w-fit ">
                  Наименование:
                </label>
                <div className="w-full ml-4">
                  <Input
                    label="Наименование"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
                <div className="pl-4">
                  <Select
                    label="Тип упаковки:"
                    className="text-xs"
                    color="blue-gray"
                  >
                    <Option>Потребительская</Option>
                    <Option>Групповая</Option>
                    <Option>Транспортная</Option>
                  </Select>
                </div>
              </div>
              <div className="flex items-center my-4">
                <label htmlFor="Товарная группа:" className="min-w-fit ">
                  Контур отрасли:
                </label>
                <div className="w-full ml-4">
                  <Input
                    label="Контур отрасли"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
              <div className="flex items-center my-4">
                <label htmlFor="Товарная группа:" className="min-w-fit ">
                  Страна маркировки:
                </label>
                <div className="w-full ml-4">
                  <Input
                    label="Страна маркировки"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
              <div className="flex items-center my-4">
                <label htmlFor="Товарная группа:" className="min-w-fit ">
                  Сертификат:
                </label>
                <div className="w-full ml-4">
                  <Input
                    label="Сертификат"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
            </form>
          </DialogBody>
        </>
      )}
    </Dialog>
  );
};

export default Modal;
