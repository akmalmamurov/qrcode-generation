import { useRef, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button, Card, CardBody, Input } from "@material-tailwind/react";

import {
  useUploadNomenclature,
  useSearchNomenclature,
} from "@/hooks/useNomenclature";
import { NomeclatureModal } from "@/widgets/modal/nomenclature-modal";
import Pagination from "@/widgets/pagination/Pagination";
import { Spinner } from "@/widgets/spinner";
import { nomenclatureHeader } from "@/data";
import { LIMIT } from "@/constants/api";
import store from "@/context/store";
import { useFetchData } from "@/hooks/useFetchData";
import { useCreateData } from "@/hooks/useCreateData";
import TotalTable from "@/widgets/table/TotalTable";
import { useDelete } from "@/hooks/useDeleteData";

export const Nomenclature = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [debouncedSearch] = useDebounce(searchTerm, 1000);
  const fileInputRef = useRef(null);
  const [page, setPage] = useState(1);

  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  const {
    data: nomenclatureData,
    refetch: refetchNomenclature,
    isLoading,
    isPending: editLoading,
  } = useFetchData("nomenclature", page);
  const { mutate: uploadFile } = useUploadNomenclature();
  const { mutate: submitNomenclature } = useCreateData("nomenclature");
  const { data: searchData } = useSearchNomenclature(debouncedSearch);
  const { isPending: loadingDelete, mutate: deleteNomenclature } =
    useDelete("nomenclature");
  const totalPages = Math.ceil((nomenclatureData?.count || 0) / LIMIT);
  const classBtn = `min-w-fit ${currentColor.btnBg} ${currentColor.text}`;

  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setIsModalOpen(!isModalOpen);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleFileUpload = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    uploadFile(formData, {
      onSuccess: () => {
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        refetchNomenclature();
      },
    });
  };
  const nomenclatureModalProps = {
    header: nomenclatureHeader,
    isModalOpen: isModalOpen,
    handleOpen: handleOpen,
    submitData: submitNomenclature,
    element: tableElement,
  };

  const nomenclatureTableProps = {
    header: nomenclatureHeader,
    isloading: isLoading,
    editLoading: editLoading,
    data: nomenclatureData,
    handleOpen: handleOpen,
    deleteLoading: loadingDelete,
    searchData: searchData,
    handleDelete: deleteNomenclature,
  };

  const pageProps = { page, setPage, totalPages };

  return (
    <div>
      <div className="flex gap-2 items-center my-6">
        <Button className={`${classBtn}`} onClick={() => handleOpen({})}>
          Создать
        </Button>
        <Button
          className={`w-28 ${classBtn}`}
          onClick={() => fileInputRef.current.click()}
        >
          {isLoading ? <Spinner size={15} /> : "Upload file"}
        </Button>
        <input
          id="file_input"
          ref={fileInputRef}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <Button className={`${classBtn}`}>Создать группу</Button>
        <Button
          className={`${classBtn}`}
          onClick={() => setIsSearchOpen(!isSearchOpen)}
        >
          Найти
        </Button>
      </div>
      {isSearchOpen && (
        <div className="w-1/2">
          <Input
            color={sidenavType === "dark" ? "white" : null}
            label="Search"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
      )}
      <Card className="my-6 bg-transparent">
        <CardBody
          className="px-0 pt-0 pb-2 overflow-y-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          <TotalTable {...nomenclatureTableProps} />
        </CardBody>
        <Pagination {...pageProps} />
      </Card>
      <NomeclatureModal {...nomenclatureModalProps} />
    </div>
  );
};

export default Nomenclature;
