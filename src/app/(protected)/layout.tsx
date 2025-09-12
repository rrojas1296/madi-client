import BottomNav from "@/features/shared/components/bottomNav/BottomNav";
import HeaderApp from "@/features/shared/components/header/Header";
import Sidebar from "@/features/shared/components/sidebar/Sidebar";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full overflow-y-auto custom-scroll flex flex-col lg:pl-[68px]">
        <HeaderApp />
        <div className="px-5 flex-1">{children}</div>
      </div>
      <BottomNav />
      <Sidebar />
    </div>
  );
};

export default Layout;
