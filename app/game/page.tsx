"use client";
import Board from "@/components/game/Board";
import { ImCross } from "react-icons/im";
import { RiRecordCircleFill } from "react-icons/ri";
import { useAtomValue } from "jotai";
import { victory } from "@/atoms/victory";
const GamePage: React.FC = () => {
  const vic = useAtomValue(victory);

  return (
    <div className="h-full flex px-4 justify-center items-center flex-col">
      <p className="flex items-center mb-20">Parte sempre chi ha il simbolo <ImCross className="ml-2"/></p>
      <Board />
      <div className="flex items-center gap-x-3 h-10 ">
        {vic 
          ? vic == 'tie' 
            ? "pareggiio"
            : (
              <>
                <p>vittoria di</p>{" "}
                {vic == "x" ? <ImCross /> : <RiRecordCircleFill />}
              </>
              ) 
          : (
            <></>
        )}
      </div>
    </div>
  );
};

export default GamePage;
