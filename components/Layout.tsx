import { ReactNode } from "react"
import Sidebar from "@/components/Sidebar"
type Props = {
    children: ReactNode
}
const MainLayout: React.FC<Props> = ({children})=>{
    return <div className="flex relative flex-wrap h-dvh bg-gray-600 w-full"  >
            <div className="w-full absolute h-10" />
            <Sidebar/>
            <div className="w-9/12 h-full pt-10" >
                {children}
            </div>
        </div>
}
 
export default MainLayout