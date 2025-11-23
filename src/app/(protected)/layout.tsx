import BottomNav from "@/features/shared/components/BottomNav/BottomNav";
import Header from "@/features/shared/components/Header/Header";
import Sidebar from "@/features/shared/components/Sidebar/Sidebar";
import SideMenu from "@/features/shared/components/Sidemenu/Sidemenu";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="w-screen h-screen">
      <div className="h-full w-full overflow-y-auto pb-16 lg:pb-0 custom-scroll flex flex-col lg:pl-[68px]">
        <Header />
        <div className="px-5 flex-1">{children}</div>
      </div>
      <BottomNav />
      <SideMenu />
      <Sidebar />
    </div>
  );
};

export default Layout;
