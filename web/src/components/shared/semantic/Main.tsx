//
//  Main.tsx
//  incicord
//
//  Created by d-exclaimation on 22:44.
//

import React from "react";
import Container from "../Container";

const Main: React.FC = ({ children }) => {
  return <Container height="100vh">{children}</Container>;
};

export default Main;
