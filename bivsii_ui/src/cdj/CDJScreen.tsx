import CDJFooter from "./CDJFooter";
import CDJHeader from "./CDJHeader";
import CDJList from "./CDJList";
import CDJSubList from "./CDJSubList";

import './style/cdjScreenStyle.css'
import './style/cdjScreenPos.css'

export default function CDJScreen() {

    return (
      <>
        <div className="cdjScreen">
            <CDJHeader title="[BIVSII]"/>

            <div className="centerMenu">
                <CDJList />
                <CDJSubList />
            </div>
            
            <CDJFooter />
        </div>
      </>
    );
};