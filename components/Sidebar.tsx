"use client";
import { useAtom } from "jotai";
import { player as p } from "@/atoms/victory";
import SelectPlayer from "./commons/SelectPlayer";
import MainLogo from "./commons/MainLogo";

const Sidebar: React.FC = () => {
  const [player, setPlayer] = useAtom(p);
  return (
    <div className=" flex flex-col w-3/12 bg-teal-600 h-full pt-10 px-10 pb-[6rem] justify-between">
      <MainLogo />
      <SelectPlayer />
    </div>
  );
};

export default Sidebar;
