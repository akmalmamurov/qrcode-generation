import store from "@/context/store";
import { formatTimestamp } from "@/utils";

const OrderInformation = ({ order }) => {
  const { sidenavType, themeColored } = store();
  const currentColor = themeColored[sidenavType];
  const className = `border ${currentColor.border} py-1 px-4 rounded-[4px]`;
  return (
    <div>
      {/* Общая информация*/}
      <div className="">
        <h1 className={`text-[18px] ${currentColor.text} mb-4 font-bold`}>
          Общая информация
        </h1>
        <div className="grid grid-cols-2 gap-8">
          {/* Товарная группа */}
          <div className={className}>
            <p className={`${currentColor.text} text-sm`}>Товарная группа</p>
            <h3 className={`${currentColor.text} font-semibold text-sm`}>
              {order?.product_group || "-"}
            </h3>
          </div>
          {/* Статус */}
          <div className={className}>
            <p className={`${currentColor.text} text-sm`}>Статус</p>
            <h3 className={`${currentColor.text} font-semibold text-sm`}>
              {order?.status || "-"}
            </h3>
          </div>
          {/* Дата создания */}
          <div className={className}>
            <p className={`${currentColor.text} text-sm`}>Дата создания</p>
            <h3 className={`${currentColor.text} font-semibold text-sm`}>
              {formatTimestamp(order?.created_at )}
            </h3>
          </div>
        </div>
      </div>
      {/* Данные производства */}
      <div className="mt-8">
        <h1 className={`text-[18px] ${currentColor.text} mb-4 font-bold`}>
          Данные производства
        </h1>
        <div className="grid grid-cols-2 gap-8">
          {/* Контактное лицо*/}
          <div className={className}>
            <p className={`${currentColor.text} text-sm`}>Контактное лицо</p>
            <h3 className={`${currentColor.text} font-semibold text-sm`}>
              {order?.contant_person || "-"}
            </h3>
          </div>
          {/* Способ выпуска товаров в оборот */}
          <div className={className}>
            <p className={`${currentColor.text} text-sm`}>
              Способ выпуска товаров в оборот
            </p>
            <h3 className={`${currentColor.text} font-semibold text-sm`}>
              {order?.release_method || "-"}
            </h3>
          </div>
          {/* Способ изготовления СИ */}
          <div className={className}>
            <p className={`${currentColor.text} text-sm`}>Способ изготовления СИ</p>
            <h3 className={`${currentColor.text} font-semibold text-sm`}>
              {order?.method_si || "-"}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInformation;
