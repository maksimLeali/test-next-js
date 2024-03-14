import Image from "next/image";
import { useRef } from "react";

const MainLogo: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  setTimeout(() => {
    console.log(containerRef.current?.clientHeight);
  }, 1000);

  return (
    <div ref={containerRef} className="w-full h-40">
        <Image
          className="w-full h-full"
          src="/next.svg"
          alt="logo"
          width={containerRef.current?.clientWidth ?? 100}
          height={containerRef.current?.clientHeight ?? 100}
        />
    </div>
  );
};

export default MainLogo;
