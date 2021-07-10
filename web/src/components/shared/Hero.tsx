import { Flex, Heading } from "@chakra-ui/react";
import React from "react";

export const Hero: React.FC<{ title: string; isFat?: boolean }> = ({
  title,
  isFat,
}) => (
  <Flex
    justifyContent="center"
    alignItems="center"
    height={isFat ? "100vh" : "unset"}
    bgGradient="linear(to-l, #7928CA, #FF0080)"
    bgClip="text"
  >
    <Heading fontSize="6vw">{title}</Heading>
  </Flex>
);
