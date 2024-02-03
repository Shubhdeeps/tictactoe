import UserAvatar from "./UserAvatar";

type Props = {
  currUserName: string;
  gridWinner: Record<number, string>;
  isCurrUserAuthorCondition: boolean;
  isOnline: boolean;
};
export default function UserScoreWindow({
  currUserName,
  gridWinner,
  isCurrUserAuthorCondition,
  isOnline,
}: Props) {
  const gridValues = Object.values(gridWinner);

  const authorWins = gridValues.filter((value) => value === "I").length;

  const nonAuthorWins = gridValues.filter((value) => value === "II").length;
  console.log("user:: ", currUserName, isOnline);
  const CSS_ONLINE = isOnline ? "" : "grayscale";
  return (
    <div className={`mt-2 ${CSS_ONLINE}`}>
      <UserAvatar authorProfile={isCurrUserAuthorCondition} />
      <div className="text-cyan-50 text-center font-bold text-lg">
        {currUserName}
      </div>
      <div className="text-cyan-50 text-center">
        Score: {isCurrUserAuthorCondition ? authorWins : nonAuthorWins}
      </div>
      {/* <GameCell
        authorState={"II"}
        currentAuthorTurn={false}
        handleCellClick={() => console.log()}
        initState={isCurrUserAuthorCondition ? "I" : "II"}
      /> */}
    </div>
  );
}
