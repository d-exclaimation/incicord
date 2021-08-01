//
//  NavBar.tsx
//  web
//
//  Created by d-exclaimation on 07:48.
//

import { ChevronRightIcon } from "@chakra-ui/icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

const NavBar: React.FC = () => {
  const bg = useColorModeValue("gray.50", "gray.700");
  return (
    <Flex justifyContent="space-between" bg={bg} p="1rem" zIndex="10">
      <Breadcrumb
        spacing="8px"
        separator={<ChevronRightIcon color="gray.500" />}
      >
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/record">
            Record
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={Link} href="/createform">
            Create
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <DarkModeSwitch />
    </Flex>
  );
};

export default NavBar;
