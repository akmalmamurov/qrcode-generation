import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { agregationHeader, projectsTableData } from "@/data";
import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/solid";
import { useForm } from "react-hook-form";
import Table from "@/widgets/table/Table";
import store from "@/context/store";

export function Aggregation() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [quantityOfAggregation, setQuantityOfAggregation] = useState(0);

  const onSubmit = (data) => {
    setQuantityOfAggregation(data.quantityOfAggregation);
  };
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-2 items-center">
          <label
            htmlFor="Товарная группа:"
            className={`min-w-fit ${currentColor.text}`}
          >
            Количество в упаковке:
          </label>
          <div className="w-72">
            <Input
              label="Количество в упаковке"
              type="number"
              color={sidenavType === "dark" ? "white" : null}
              {...register("quantityOfAggregation")}
            />
          </div>
          <Button className="bg-blue-gray-700">+</Button>
          <Button className="bg-blue-gray-700">-</Button>
          <Button className="bg-blue-gray-500 min-w-fit" type="submit">
            Apply
          </Button>
          <Button className="bg-green-500 min-w-fit">Проверить статус </Button>
        </div>
      </form>

      <div className={`text-center text-6xl ${currentColor.text} my-6`}>
        0/{quantityOfAggregation}
      </div>

      <Table listData={projectsTableData} header={agregationHeader} />
      <Card>
        <CardBody
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "gray transparent",
          }}
          className={`overflow-x-scroll border-2 border-blue-gray-300 max-h-[30rem] overflow-y-auto flex ${currentColor.bg}`}
        >
          <div className="w-1/5 ">
            <CheckIcon className="w-8 h-8 text-green-500" />
          </div>
          <div className="flex items-center justify-center w-full  text-2xl text-green-500">
            Считан 01046401086672082575777082419%93GVz
          </div>
          <div className="flex justify-end w-1/5">
            <CheckIcon className="w-8 h-8 text-green-500 " />
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Aggregation;
