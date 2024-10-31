import { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import UserEditModal from "./UserEditModal.jsx";
import UsersHeader from "@/data/users-header";
import { useFetchData } from "@/hooks/useFetchData";
import { useCreateData } from "@/hooks/useCreateData";
import TotalTable from "@/widgets/table/TotalTable";
import { usersTableData } from "@/data";
import { useDelete } from "@/hooks/useDeleteData";

export const ListOfUsers = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const handleOpen = (element) => {
    if (element) {
      console.log(element);
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setIsModalOpen(!isModalOpen);
  };
  const { data: users, isLoading, isPending } = useFetchData("user");
  const { mutate: editUser } = useCreateData("user");
  const { mutate: deleteUser, isPending: deleteLoading } = useDelete("user");
  return (
    <div>
      <div className="flex gap-2 items-center my-6"></div>
      <Card className=" bg-transparent my-6">
        <CardBody
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "gray transparent",
          }}
          className="overflow-x-scroll px-0 pt-0 pb-2 overflow-y-auto"
        >
          <TotalTable
            header={usersTableData}
            isloading={isLoading}
            editLoading={isPending}
            type={"user"}
            data={users}
            handleOpen={handleOpen}
            deleteLoading={deleteLoading}
            handleDelete={deleteUser}
          />
        </CardBody>
      </Card>
      <UserEditModal
        element={tableElement}
        header={UsersHeader}
        isModalOpen={isModalOpen}
        handleOpen={handleOpen}
        editUser={editUser}
      />
    </div>
  );
};

export default ListOfUsers;
