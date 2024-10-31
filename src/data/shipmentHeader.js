const shipmentHeader = {
  operation_type: {
    code: "operation_type",
    type: "select",
    name: "Тип операции",
    options: ["Продажа", "Комиссия", "Агент"],
  },
  number: { code: "number", name: "Номер", type: "number" },

  time: { code: "time", name: "Дата", type: "date" },
  status: { code: "status", name: "Статус ", type: "text" },
  counterparty: {
    code: "counterparty",
    name: " Контрагент ",
    type: "select",
    width: "w-[40%]",
    options: ["'RICOMEL BEVERAGES' MCHJ", "'RICOMEL BEVERAGES' MCHJ"],
  },
  warehouse: {
    code: "warehouse",
    name: "Склад",
    type: "select",
    options: ["Основной", "Основной"],
  },
  coutnerpartyReciver: {
    code: "coutnerpartyReciver",
    name: "Грузополучатель ",
    type: "select",
    width: "w-full",
    options: ["'RICOMEL BEVERAGES' MCHJ", "'RICOMEL BEVERAGES' MCHJ"],
  },
  industryOutline: {
    code: "industryOutline",
    name: "Контур отрасли",
    type: "text",
  },
};

export default shipmentHeader;

export const shipmentModalData = {
  number_facture: {
    code: "number_facture",
    position: "top",
    type: "number",
    name: "Номер счет-фактуры",
    width: "w-[45%]",
  },
  document_date: {
    code: "document_date",
    position: "top",
    width: "w-[45%]",
    name: "Дата документа",
    type: "date",
  },
  contract_number: {
    code: "contract_number",
    position: "top",
    width: "w-[45%]",
    name: "Номер контракта",
    type: "number",
  },
  contract_date: {
    code: "contract_date",
    position: "top",
    width: "w-[45%]",
    name: "Дата контракта",
    type: "date",
  },
};
