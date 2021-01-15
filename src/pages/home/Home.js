// All GTAS code is Copyright 2016, The Department of Homeland Security (DHS), U.S. Customs and Border Protection (CBP).
//
// Please see license.txt for details.

import React, { useEffect, useContext } from "react";
import Header from "../../components/header/Header";
import { LookupContext } from "../../context/data/LookupContext";
import { LK } from "../../utils/constants";

const Home = props => {
  const { lookupAction } = useContext(LookupContext);

  useEffect(() => {
    lookupAction({ method: "refresh", type: LK.HITCAT });
    lookupAction({ method: "refresh", type: LK.COUNTRY });
    lookupAction({ method: "refresh", type: LK.CARRIER });
    lookupAction({ method: "refresh", type: LK.AIRPORT });
    lookupAction({ method: "refresh", type: LK.CCTYPE });
    lookupAction({ method: "refresh", type: LK.ROLE });
    lookupAction({ method: "refresh", type: LK.NOTETYPE });
  }, []);

  return (
    <div>
      <Header></Header>
      {props.children}
    </div>
  );
};

export default Home;
