import CDJFooter from "@/components/cdjFooter/CDJFooter";
import CDJHeader from "@/components/cdjHeader/CDJHeader";
import CDJList from "@/components/cdjList/CDJList";
import CDJSubList from "@/components/cdjSubList/CDJSubList";

import ScrollContextProvider from "@/hooks/useScrollContext";

import classes from './cdjScreen.module.scss';

//TODO: Replace with fetch and maybe move somewhere else
const AllListItems: string[] = ["[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]", "", "Hidden!", "", "Hidden2!", "[TICKETS]", "[PHOTO'S]", "[CONTACT]", "[PROJECTS]", "[NEW PROJECTS]" ];

export default function CDJScreen() {

    return (
      <>
        <div className={classes.cdjScreen}>
          <CDJHeader title="[BIVSII]"/>

          <div className={classes.centerMenu}>
            <ScrollContextProvider 
              initialList={AllListItems} 
              scrollSensitivity={100}
              totalItemsToShow={6}
            >
              <CDJList />
            </ScrollContextProvider>
            <CDJSubList />
          </div>
          
          <CDJFooter />
        </div>
      </>
    );
};