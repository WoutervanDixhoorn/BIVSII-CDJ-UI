import CDJFooter from "./CDJFooter";
import CDJHeader from "./CDJHeader";
import CDJList from "./list/CDJList";
import CDJSubList from "./list/CDJSubList";

import ScrollContextProvider from "./list/scrollbar/useScrollContext";

import './style/cdjScreenStyle.css'
import './style/cdjScreenPos.css'


//TODO: Replace with fetch and maybe move somewhere else
const AllListItems: string[] = ["[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]", "", "Hidden!", "Hidden2!","[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]" ];

export default function CDJScreen() {

    return (
      <>
        <div className="cdjScreen">
            <CDJHeader title="[BIVSII]"/>

            <div className="centerMenu">
                <ScrollContextProvider initialList={AllListItems} scrollSensitivity={10}>
                  <CDJList />
                </ScrollContextProvider>
                <CDJSubList />
            </div>
            
            <CDJFooter />
        </div>
      </>
    );
};