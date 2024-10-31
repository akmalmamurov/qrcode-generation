export const nomeclatureBottom = {
  measurement_name: { type: "text", name: "Наименование полное" },
  measurement_unit: {
    type: "select",
    name: "Единица измерения",
    options: ["шт", "л", "мл", "гр", "кг"],
  },
  product_origin:{
    type: "select",
    options: ["Собственное производство", "Купля-продажа", "Оказание услуг","Не участвую"],
    name: "Происхождение товара",
    disabled: false,
  },
  nds: {
    type: "select",
    name: "НДС",
    options: ["Без НДС", "0%", "12%", "15%"],
  },
  measurement_value: { type: "number", name: "Вес" },
  measurement_min_value: { type: "number", name: "Мин вес" },
  measurement_max_value: { type: "number", name: "Макс вес" },
};

export const nomeclatureAlcohol = {
  alcohol_products: { type: "number", name: "Код вида алкогольной продукции" },
  alcohol_code: { type: "number", name: "Код алкогольной продукции" },
  capacity: { type: "number", name: "Емкость тары(мл)" },
  fortress: { type: "number", name: "Крепкость" },
  inn_alcohol: { type: "number", name: "ИНН Производителя алкоголя" },
  kpp_alcohol: { type: "number", name: "КПП Производителя алкоголя" },
};
