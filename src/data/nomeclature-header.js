export const nomenclatureHeader = {
  name: {
    code: "name",
    type: "string",
    name: "Наименование",
    disabled: false,
  },
  gtin: { code: "gtin", type: "number", name: "GTIN", disabled: false },
  expires_in: {
    code: "expires_in",
    type: "number",
    name: "Срок годности в днях",
    disabled: false,
  },
  amount_in_package: {
    code: "amount_in_package",
    type: "number",
    name: "Количество в упаковке",
    disabled: false,
  },
  code_tnwd: {
    code: "code_tnwd",
    type: "number",
    name: "Код ТН ВЭД",
    disabled: false,
  },
  type: {
    code: "type",
    type: "select",
    options: [
      "Tobacco",
      "Alcohol",
      "Beer",
      "Pharma",
      "Appliances",
      "Water",
      "Antiseptic",
    ],
    name: "Тип товара",
    disabled: false,
  },

  package_type: {
    code: "package_type",
    type: "select",
    options: ["Потребительская", "Групповая", "Транспортная"],
    name: "Тип упаковки товара",
    disabled: false,
  },
  ikpu: { code: "ikpu", type: "number", name: "ИКПУ", disabled: false },
};
export default nomenclatureHeader;
