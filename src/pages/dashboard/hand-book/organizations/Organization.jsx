import { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import {
  MagnifyingGlassIcon,
  DocumentPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

import { useSearchOrganization } from "@/hooks/useOrganization";
import Pagination from "@/widgets/pagination/Pagination";
import { useCreateData } from "@/hooks/useCreateData";
import OrganizationModal from "./OrganizationModal";
import { useFetchData } from "@/hooks/useFetchData";
import { organizationHeader } from "@/data";
import { Spinner } from "@/widgets/spinner";
import { LIMIT } from "@/constants/api";
import store from "@/context/store";
import TotalTable from "@/widgets/table/TotalTable";
import { useDelete } from "@/hooks/useDeleteData";

export function Organizations() {
  const [page, setPage] = useState(1);
  const [tableElement, setTableElement] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actualSearchTerm, setActualSearchTerm] = useState("");
  const { sidenavType, themeColored } = store();
  const inputRef = useRef(null);

  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setIsModalOpen(!isModalOpen);
  };
  const {
    data: organizationData,
    isLoading,
    isPending: editLoading,
  } = useFetchData("organization", page);
  const { mutate: createOrganization } = useCreateData("organization");
  const { mutate: deleteOrg, isPending: loadingDelete } =
    useDelete("organization");

  const { data: searchData, isLoading: isSearchFetching } =
    useSearchOrganization(actualSearchTerm);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchClick = () => {
    setActualSearchTerm(searchTerm.trim(" "));
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setActualSearchTerm("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setActualSearchTerm(searchTerm);
    }
  };
  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setActualSearchTerm("");
      setSearchTerm("");
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onSubmit = (data) => {
    console.log(data);
    createOrganization(data);
    handleOpen();
  };
  const currentColor = themeColored[sidenavType];
  const totalPages = Math.ceil((organizationData?.count || 0) / LIMIT);
  const modalProps = {
    element: tableElement,
    isModalOpen,
    handleOpen: handleOpen,
    onSubmit,
  };
  const btnClass = `min-w-fit ${currentColor.btnBg} ${currentColor.text}`;
  return (
    <>
      <div className="flex mt-8">
        <div className="w-1/2">
          <Button className={btnClass} onClick={() => handleOpen({})}>
            Создать
          </Button>
          <Button className={`${btnClass} ml-2`}>
            <DocumentPlusIcon className="w-4 h-4 text-green-500" />
          </Button>
        </div>
        <div className="w-1/2 flex justify-end">
          <div className="flex w-72 items-center" ref={inputRef}>
            <div className="relative">
              <Input
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                label="Поиск"
                type="text"
                color={sidenavType === "dark" ? "white" : null}
              />
              {searchTerm && (
                <span
                  className="absolute right-2 top-2 cursor-pointer"
                  onClick={handleClearSearch}
                >
                  <XMarkIcon className={`w-6 h-6 ${currentColor.text}`} />
                </span>
              )}
            </div>

            <Button
              onClick={handleSearchClick}
              className={`min-w-fit ml-4 bg-transparent border-2 ${
                sidenavType === "dark" ? "border-white" : null
              }`}
              type="button"
            >
              {isSearchFetching ? (
                <Spinner size={"24px"} />
              ) : (
                <MagnifyingGlassIcon
                  className={`w-4 h-4 ${currentColor.text}`}
                />
              )}
            </Button>
          </div>
        </div>
      </div>
      <Card className={`mt-8 bg-transparent`}>
        <CardBody
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
          className=" px-0 pt-0 pb-2 max-h-[32rem] overflow-y-auto"
        >
          <TotalTable
            header={organizationHeader}
            isloading={isLoading}
            editLoading={editLoading}
            data={organizationData}
            handleOpen={handleOpen}
            handleDelete={deleteOrg}
            deleteLoading={loadingDelete}
            searchData={searchData}
          />
        </CardBody>

        <Pagination page={page} setPage={setPage} totalPages={totalPages} />
      </Card>

      <OrganizationModal {...modalProps} />
    </>
  );
}

export default Organizations;
