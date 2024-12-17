import { Sidebar } from "flowbite-react";
import { urlsAdministrator } from "../../../config";
import ItemCollapse from "./ItemCollapse";
import Item from "./Item";

export function MySideBar() {

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <Sidebar.Items>
        <Sidebar.ItemGroup>

          {
            /* Mostramos Navegacion */
            urlsAdministrator.map((e,i) => {
                return e.urls.length > 1 
                ?
                  <ItemCollapse label={e.name} icon={e.icon} urls={e.urls} key={i+1}/>
                :
                  <Item name={e.name} icon={e.icon} url={e.urls} key={i+1}/>
            })
          }
          
        </Sidebar.ItemGroup> 
      </Sidebar.Items>
    </Sidebar>
  );
}

export default MySideBar
