import { Button, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import Container from "./Container";

export const CTA: React.FC = () => (
  <Container
    flexDirection="row"
    position="fixed"
    bottom="0"
    width="100%"
    maxWidth="48rem"
    py={3}
  >
    <ChakraLink
      isExternal
      href="https://www.github.com/d-exclaimation"
      flexGrow={1}
      mx={2}
    >
      <Button width="100%" variant="outline" colorScheme="pink">
        d-exclaimation
      </Button>
    </ChakraLink>

    <ChakraLink
      isExternal
      href="https://github.com/d-exclaimation"
      flexGrow={3}
      mx={2}
    >
      <Button width="100%" variant="solid" colorScheme="pink">
        Github repo
      </Button>
    </ChakraLink>
  </Container>
);
