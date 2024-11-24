import Header from "../common/Header"
import MyFooter from "../common/Footer"
import MySideBar from "../common/SideBar"
import { Outlet } from "react-router-dom"

const Main = () => {
  return (
    <>
      <div>
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="border-2 border-gray-200 shadow-sm">
            <Header/>
          </div>

          <div className="flex flex-grow">
            
            {/* SideBar */}
            <div className="overflow-hidden">
              <MySideBar/>
            </div>
            
            {/* Content */}
            <div className="overflow-hidden">
              <Outlet/>
            </div>

          </div>

          {/* Footer */}
          <div className="border-2 border-gray-200">
            <MyFooter/>
          </div>

        </div>
      </div>
    </>
  )
}

export default Main