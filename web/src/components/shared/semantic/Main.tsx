//
//  Main.tsx
//  incicord
//
//  Created by d-exclaimation on 22:44.
//

import { Flex } from "@chakra-ui/react";
import React from "react";
import Container from "../Container";
import NavBar from "../NavBar";

const Main: React.FC = ({ children }) => {
  // const { isPortrait } = useResponsive();
  return (
    <Flex flexDir="column" h="100vh">
      <NavBar />
      <Container flexGrow={1} flexShrink={1} flexBasis="auto">
        {children}
      </Container>
    </Flex>
  );
};

export default Main;
