export const organizationHeader = {
  name: {
    code: "name",
    type: "string",
    name: "Наименование",
    disabled: false,
  },
  inn: {
    code: "inn",
    type: "number",
    name: "ИНН",
    disabled: false,
  },
  director: {
    code: "director",
    type: "string",
    name: "Руководитель",
  },
  mfo: {
    code: "mfo",
    type: "number",
    name: "МФО",
    disabled: false,
  },
  checking_account: {
    code: "checking_account",
    type: "string",
    name: "Расчетный счет",
  },
  certificate: {
    code: "certificate",
    type: "string",
    name: "Адрес CУЗ",
    value: "omscloud.asilbelgisi.uz",
    disabled: false,
  },

  department: {
    code: "department",
    type: "select",
    options: [
      "Сигареты",
      "Алкогольная продукция (кроме пива)",
      "Пиво и пивные напитки",
      "Лекарственные средства",
      "Бытовая техника",
      "Вода и прохладительные напитки",
    ],
    name: "Контур отрасли",
    disabled: false,
  },
  address: {
    code: "address",
    type: "text",
    name: "Адрес",
    disabled: false,
  },
  phone: {
    code: "phone",
    type: "tel",
    name: "Телефон",
    disabled: false,
  },
  oms_id: {
    code: "oms_id",
    type: "text",
    name: "ОМС ID",
    disabled: false,
  },

  dynamic_token: {
    code: "dynamic_token",
    type: "string",
    name: "Tокен",
    disabled: false,
  },
};
