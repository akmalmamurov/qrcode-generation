import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { useForm, Controller } from "react-hook-form";
function CreateNewUser({ open, handleOpen }) {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="md"
        className="p-2"
      >
        <DialogHeader>Создание новую линию</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex items-center my-4">
              <label htmlFor="Товарная группа:" className="min-w-fit ">
                Наименование линии:
              </label>
              <div className="w-full ml-4">
                <Input
                  label="Наименование линии"
                  type="text"
                  {...register("nameOfLine")}
                />
              </div>
            </div>
            <div className="flex items-center my-4">
              <label htmlFor="Товарная группа:" className="min-w-fit ">
                Тип сканера:
              </label>
              <div className="w-full ml-4">
                <Input
                  label="Тип сканера"
                  type="text"
                  {...register("typeOfScanner")}
                />
              </div>
            </div>
            <div className="flex items-center my-4">
              <label htmlFor="Товарная группа:" className="min-w-fit ">
                Адрес IPv4 камера:
              </label>
              <div className="w-full ml-4">
                <Input
                  label="Адрес IPv4 камера1"
                  type="text"
                  {...register("camer1")}
                />
              </div>
            </div>
            <div className="flex items-center my-4">
              <label htmlFor="Товарная группа:" className="min-w-fit ">
                Адрес IPv4 камера2:
              </label>
              <div className="w-full ml-4">
                <Input
                  label="Адрес IPv4 камера2"
                  type="text"
                  {...register("camera2")}
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
      </Dialog>
    </>
  );
}

export default CreateNewUser;
