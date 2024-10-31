import React, { useState } from "react";
import Modal from "@/widgets/modal/Modal";
import {
  Button,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import store from "@/context/store";

const Applications = () => {
  const { handleSubmit, register } = useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpen = () => setIsModalOpen(!isModalOpen);
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="bg-transparent">
      <div
        className={`flex items-center ${currentColor.bg} rounded-md border-2 border-white-600 my-2 font-medium p-3`}
      >
        <Button
          className={`min-w-fit ${currentColor.btnBg} ${currentColor.text}`}
          onClick={handleOpen}
        >
          Создать
        </Button>
      </div>

      <Modal open={isModalOpen} handleOpen={handleOpen}>
        <>
          <DialogHeader className={`${currentColor.text} `}>
            Создать новую организацию
          </DialogHeader>
          <DialogBody>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="flex items-center my-4">
                <label
                  htmlFor="Товарная группа:"
                  className={`min-w-fit ${currentColor.text} `}
                >
                  Код:
                </label>
                <div className="w-48 ml-4">
                  <Input
                    color={sidenavType === "dark" ? "white" : null}
                    label="Количество в упаковке"
                    type="number"
                    {...register("quantityOfAggregation")}
                  />
                </div>
                <label
                  htmlFor="Товарная группа:"
                  className={`min-w-fit ${currentColor.text} ml-8 `}
                >
                  Код организации во внешней БД:
                </label>
                <div className="w-full ml-4">
                  <Input
                    color={sidenavType === "dark" ? "white" : null}
                    label="Количество в упаковке"
                    type="number"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
              <div className="flex items-center my-4">
                <label
                  htmlFor="Товарная группа:"
                  className={`min-w-fit ${currentColor.text} `}
                >
                  Наименование:
                </label>
                <div className="w-full ml-4">
                  <Input
                    color={sidenavType === "dark" ? "white" : null}
                    label="Наименование"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
              <div className="flex items-center my-4">
                <label
                  htmlFor="Товарная группа:"
                  className={`min-w-fit ${currentColor.text} `}
                >
                  Контур отрасли:
                </label>
                <div className="w-full ml-4">
                  <Input
                    color={sidenavType === "dark" ? "white" : null}
                    label="Контур отрасли"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
              {
                // onSubmit, handleOpen, modalName, isModalOpen, code, orgBD, reName, contrOtrasil, counterQr, sertification
              }
              <div className="flex items-center my-4">
                <label
                  htmlFor="Товарная группа:"
                  className={`min-w-fit ${currentColor.text} `}
                >
                  Страна маркировки:
                </label>
                <div className="w-full ml-4">
                  <Input
                    color={sidenavType === "dark" ? "white" : null}
                    label="Страна маркировки"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
              <div className="flex items-center my-4">
                <label
                  htmlFor="Товарная группа:"
                  className={`min-w-fit ${currentColor.text} `}
                >
                  Сертификат:
                </label>
                <div className="w-full ml-4">
                  <Input
                    color={sidenavType === "dark" ? "white" : null}
                    label="Сертификат"
                    type="text"
                    {...register("quantityOfAggregation")}
                  />
                </div>
              </div>
            </form>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Отменить</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
              <span>Создать</span>
            </Button>
          </DialogFooter>
        </>
      </Modal>
    </div>
  );
};

export default Applications;
