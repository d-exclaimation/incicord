import { Flex, FlexProps, useColorMode } from "@chakra-ui/react";
import React from "react";

const Container: React.FC<FlexProps> = (props) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.100", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bg={bgColor[colorMode]}
      color={color[colorMode]}
      {...props}
    />
  );
};

export default Container;
