import { useRef, useState } from "react";
import { ImCross } from "react-icons/im";
import { RiRecordCircleFill } from "react-icons/ri";
import { MdArrowBackIosNew } from "react-icons/md";
import { useAtom } from "jotai";
import { player as p } from "@/atoms/victory";

import { useOnClickOutside } from "@/hooks/useOnClickOutside";

type Props = {};

const SelectPlayer: React.FC<Props> = ({}) => {
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useAtom(p);
  const playerClass = "w-10 p-2 h-full border-r border-gray-600";

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, () => {
    setOpen(false);
  });

  const selectPlayer = (pl: "x" | "o") => {
    setPlayer(pl);
    setOpen(false);
  };

  return (
    <div className="w-full h-12 flex justify-center gap-10 items-center">
      <p>Gioca come</p>
      <div className="relative w-[4rem] h-10 border rounded-md border-gray-600 ">
        <div
          ref={ref}
          onClick={() => setOpen(!open)}
          className="w-full flex items-center"
        >
          {player == "x" ? (
            <ImCross className={playerClass} />
          ) : (
            <RiRecordCircleFill className={playerClass} />
          )}
          <MdArrowBackIosNew
            className={`h-full w-auto transition-transform ${
              open ? "rotate-[-90deg]" : ""
            } `}
          />
        </div>
        <div
          className={`absolute py-2 box-border transition-[max-height, opacity] border border-gray-600  w-full duration-300 ease-in-out overflow-hidden flex flex-col justify-evenly items-center gap-2 ${
            open ? "max-h-[10rem] opacity-1" : "max-h-0 opacity-0"
          }`}
        >
          <ImCross onClick={() => selectPlayer("x")} />
          <RiRecordCircleFill onClick={() => selectPlayer("o")} />
        </div>
      </div>
    </div>
  );
};

export default SelectPlayer;
