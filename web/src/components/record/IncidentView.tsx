//
//  IncidentView.tsx
//  web
//
//  Created by d-exclaimation on 17:35.
//

import {
  Badge,
  Box,
  Flex,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Incident, IncidentSeverity } from "../../models/Incident";

type Props = {
  data: Incident;
};

type ColorScheme =
  | "blue"
  | "cyan"
  | "gray"
  | "green"
  | "orange"
  | "pink"
  | "purple"
  | "red"
  | "teal"
  | "yellow"
  | "whiteAlpha"
  | "blackAlpha"
  | "linkedin"
  | "facebook"
  | "messenger"
  | "whatsapp"
  | "twitter"
  | "telegram";

const IncidentView: React.FC<Props> = ({ data }) => {
  const opt = useColorModeValue(
    { bg: "gray.50", shadow: "lg", fontColor: "black" },
    { bg: "gray.800", shadow: "dark-lg", fontColor: "#fafafa" }
  );
  const severityColor = (x: IncidentSeverity): ColorScheme => {
    switch (x) {
      case "none":
        return "whatsapp";
      case "calm":
        return "teal";
      case "mild":
        return "linkedin";
      case "severe":
        return "purple";
      default:
        return "facebook";
    }
  };
  const w = useBreakpointValue({
    base: "90vw",
    sm: "45vw",
    md: "45vw",
    lg: "45vw",
    xl: "30vw",
  });
  return (
    <Flex
      className="SlideUpCard"
      direction={"row"}
      bg={opt.bg}
      boxShadow={opt.shadow}
      borderRadius="lg"
      w={w}
      overflow="hidden"
    >
      <Box w="20px" bg={data.info.streakColor} objectFit="cover" />

      <Box alignItems="center" p="3" m={5}>
        <Box
          mt="1"
          fontWeight="semibold"
          lineHeight="tight"
          isTruncated
          color={opt.fontColor}
        >
          {data.name}
        </Box>
        <Badge
          borderRadius="full"
          px="2"
          colorScheme={severityColor(data.severity)}
          my="0.3rem"
        >
          {data.severity}
        </Badge>
        <Text fontSize="sm" color="gray.500">
          {data.info.relativeDate}
        </Text>
      </Box>
    </Flex>
  );
};

export default IncidentView;
