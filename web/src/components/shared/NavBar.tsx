//
//  NavBar.tsx
//  web
//
//  Created by d-exclaimation on 07:48.
//

import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

const NavBar: React.FC = () => {
  return (
    <Flex justifyContent="space-between" p="1rem">
      <Text>Home {">"} About</Text>
      <DarkModeSwitch />
    </Flex>
  );
};

export default NavBar;
