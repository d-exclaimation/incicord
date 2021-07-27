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
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";
import { DarkModeSwitch } from "./DarkModeSwitch";

const NavBar: React.FC = () => {
  return (
    <Flex justifyContent="space-between" p="1rem">
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
          <BreadcrumbLink as={Link} href="/about">
            About
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <DarkModeSwitch />
    </Flex>
  );
};

export default NavBar;
