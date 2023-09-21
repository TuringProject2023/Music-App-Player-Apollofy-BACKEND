import { Outlet } from "react-router-dom";
import { SideBar } from "..";
import { Footer } from "..";
import { GlobalPrivatePageStyles} from "../../global";



const Layout = () => {
;


  return (
    <>
      <GlobalPrivatePageStyles>
        <SideBar />

        <Outlet />

        <Footer />
      </GlobalPrivatePageStyles>
    </>
  );
};

export default Layout;
