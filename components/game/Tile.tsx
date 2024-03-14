import { ImCross } from "react-icons/im";
import { RiRecordCircleFill } from "react-icons/ri";

type Props = {
  checked?: "x" | "o";
  onClick: () => void;
  user?: boolean
};

const Tile: React.FC<Props> = ({ checked, onClick, user }) => {
    const iconClassString =`w-full h-full cursor pointer ${user? 'fill-teal-400' : ''}`
  return (
    <div
      className="box-content p-5 w-1/3 aspect-[1] even:border-l-2 even:border-r-2 border-solid flex justify-center items-center "
      onClick={() => {
        if (!checked) onClick();
      }}
    >
      {checked ? checked == "x" ? <ImCross className={iconClassString}   /> : <RiRecordCircleFill className={iconClassString}  /> : <></>}
    </div>
  );
};

export default Tile;
