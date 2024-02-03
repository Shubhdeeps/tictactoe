import { UserA } from "../assets/userA";
import { userB } from "../assets/userB";

export default function UserAvatar({
  authorProfile,
}: {
  authorProfile: boolean;
}) {
  return (
    <div
      className={` text-cyan-50 flex items-center justify-center text-3xl font-bold w-[100px] h-[100px] relative`}
    >
      <span
        className={`w-3 h-3 absolute rounded-full bottom-0 left-0 bg-green-500`}
      ></span>
      {authorProfile ? UserA : userB}
    </div>
  );
}
