import {
  Flex,
  Heading,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CTA } from "../components/shared/CTA";
import { Hero } from "../components/shared/Hero";
import MetaHead from "../components/shared/meta/MetaHead";
import Main from "../components/shared/semantic/Main";
import pallete from "../constants/pallette";
import { useResponsive } from "../hooks/useResponsive";
import { createIncident } from "../models/Incident";

const TEMPLATE_DTO = JSON.stringify(
  createIncident({
    name: "Drinking coffee",
    lastOccurred: new Date(),
    severity: "mild",
  }),
  null,
  2
);
const API_REQUEST = `curl -d "@data.json"
 -H "Content-Type: application/json" 
 -H "Authorization: Bearer <api-token>" 
 -H "Other-Allowed-Header: <value>"
 -X POST https//incicord.io/v1/incident/create
`;

const Index: React.FC = () => {
  const [state, setState] = useState("");
  const { isPortrait } = useResponsive();
  const { colorMode } = useColorMode();
  const borderColor = useColorModeValue(pallete.red, pallete.redple);
  const snippetSize = (() => (isPortrait ? "100%" : "50%"))();
  const border = (() => `solid ${borderColor} 2px !important`)();

  useEffect(() => {
    setState("Incident Record");
  }, []);

  return (
    <Main>
      <MetaHead
        title={state}
        description="Record and persist all your incident and count how many days since they occurred"
      />
      <Flex flexDir="column" alignItems="center">
        <Hero title={state} />
        <Flex
          maxW="60vw"
          shadow="md"
          p="3"
          boxShadow="lg"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          flexDir="column"
          alignItems="center"
        >
          <Heading fontSize="2.5vmin" my="3">
            Create a new incident to a record by making the API request
          </Heading>
          <Flex flexDir={isPortrait ? "column" : "row"} maxW="100%">
            <Text maxW={snippetSize} className={colorMode} border={border}>
              <pre>{TEMPLATE_DTO}</pre>
            </Text>
            <Text maxW={snippetSize} border={border} className={colorMode}>
              <pre>{API_REQUEST}</pre>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <CTA />
    </Main>
  );
};

export default Index;
