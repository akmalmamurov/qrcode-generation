import store from "@/context/store";
import { nomeclatureAlcohol, nomeclatureBottom } from "@/data";
import { Input, Option, Select } from "@material-tailwind/react";
import React from "react";
import { Controller } from "react-hook-form";

const NomenclatureModalBottom = (props) => {
  const { alcohol, excise, control, setAlcohol, setExcise, setPrice, setAksiz, errors, register} = props;
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  return (
    <div>
      <div className="mt-10 w-full">
        <div className="flex gap-4">
          <label className={`min-w-fit font-bold ${currentColor.text}`}>
            Реквизиты:
          </label>
          <div className="flex gap-4 mb-4">
            <div className="itemCenter gap-1">
              <label htmlFor="alcohol" className={`${currentColor.text}`}>
                Алкоголь
              </label>
              <input
                checked={alcohol}
                onChange={() => setAlcohol(!alcohol)}
                id="alcohol"
                type="checkbox"
                className="w-4 h-4"
              />
            </div>
            <div className="itemCenter gap-1">
              <label htmlFor="excice" className={`${currentColor.text}`}>
                Подакцизный
              </label>
              <input
                id="excice"
                checked={excise}
                onChange={() => setExcise(!excise)}
                type="checkbox"
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>

        <div className="grid3">
          {Object.entries(nomeclatureBottom).map(([key, item]) =>
            item.type === "select" ? (
              <div
                className={`flexCol ${currentColor.text} `}
                key={key}
              >
                <label htmlFor={item.name} className="label">
                  {item.name}:
                </label>
                <Controller
                  name={key}
                  control={control}
                  defaultValue={item[key]}
                  render={({ field }) => (
                    <Select
                      id={item.name}
                      label={item.name}
                      value={field.value}
                      className={`text-sm text-${currentColor.text}`}
                      labelProps={{
                        className: `text-${currentColor.text}`,
                      }}
                      menuProps={{
                        className: `text-${currentColor.text} ${currentColor.bg}`,
                      }}
                      color="blue-gray"
                      onChange={(value) => field.onChange(value)}
                      error={errors[key] ? true : false}
                    >
                      {item.options.map((el, index) => (
                        <Option key={index} value={el}>
                          {el}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                {errors[key] && (
                  <span className="text-red-500 text-sm">
                    {errors[key].message}
                  </span>
                )}
              </div>
            ) : null,
          )}
        </div>
        <div className="grid5">
          {Object.entries(nomeclatureBottom).map(([key, item]) =>
            item.type !== "select" ? (
              <div className="flexCol" key={key}>
                <label htmlFor={key} className={`label ${currentColor.text}`}>
                  {item.name}:
                </label>
                <div className="w-full">
                  <Input
                    id={key}
                    label={item.name}
                    color={sidenavType === "dark" ? "white" : null}
                    type={item.type}
                    {...register(key, {
                      required: false,
                    })}
                    error={errors[key] ? true : false}
                  />
                  {errors[key] && (
                    <span className="text-red-500 text-sm">
                      {errors[key].message}
                    </span>
                  )}
                </div>
              </div>
            ) : null,
          )}
          <div className={"flexCol"}>
            <label htmlFor="price" className={`label  ${currentColor.text}`}>
              Цена без НДЦ
            </label>
            <Input
              id="price"
              label="Цена без НДЦ"
              color={sidenavType === "dark" ? "white" : null}
              type="number"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          {excise && (
            <div className={'flexCol'}>
              <label htmlFor={"excise"} className={`label  ${currentColor.text}`}>
                Ставка акциза:
              </label>
              <div className="w-full">
                <Input
                  id={"excise"}
                  label={"Ставка акциза"}
                  color={sidenavType === "dark" ? "white" : null}
                  type="number"
                  onChange={(e) => setAksiz(e.target.value)}
                />
              </div>
            </div>
          )}
          {alcohol && (
            <>
              {Object.entries(nomeclatureAlcohol).map(([key, item]) => (
                <div className={`flexCol`} key={key}>
                  <label
                    htmlFor={key}
                    className={`label ${currentColor.text}`}
                  >
                    {item.name}:
                  </label>
                  <div className="w-full">
                    <Input
                      id={key}
                      label={item.name}
                      color={sidenavType === "dark" ? "white" : null}
                      type={item.type}
                      {...register(key, {
                        required: "This field is required",
                      })}
                      error={errors[key] ? true : false}
                    />
                    {errors[key] && (
                      <span className="text-red-500 text-sm">
                        {errors[key].message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NomenclatureModalBottom;
