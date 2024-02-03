type Props = {
  componentsArray: JSX.Element[];
  bg: "bg-gray-800 gap-2" | "bg-black";
  disable?: boolean;
};

const TurnAndBoxStyle = {
  true: "brightness-50",
  false: "",
};
export default function GameGridWrapper(props: Props) {
  const { componentsArray, disable } = props;
  const shouldDisableTheWholeGrid = !!disable;
  // const highLightGrid = disable === false;

  // const BORDER_HIGHTLIGHT_CLASS = highLightGrid ? "" : "";
  const CSS_CLASS_FOR_DISABLED =
    TurnAndBoxStyle[String(shouldDisableTheWholeGrid) as "true" | "false"];
  return (
    <div
      className={` grid grid-cols-3 grid-rows-3 w-fit h-fit  ${props.bg} ${CSS_CLASS_FOR_DISABLED} `}
    >
      {componentsArray.map((Element, index) => {
        return (
          <div className="col-span-1 row-span-1" key={index}>
            {Element}
          </div>
        );
      })}
    </div>
  );
}
