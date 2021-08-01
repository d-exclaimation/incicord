//
//  IncidentView.tsx
//  web
//
//  Created by d-exclaimation on 17:35.
//

import { CloseIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Flex,
  IconButton,
  Text,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import React from "react";
import { deleteRecord } from "../../data/deleteRecord";
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
  const toast = useToast();
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
    lg: "30vw",
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

      <Box alignItems="center" p="3" m={5} mr="auto">
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
      <Flex m={3}>
        <IconButton
          colorScheme="teal"
          aria-label="delete-post"
          size="sm"
          variant="ghost"
          onClick={async () => {
            const result = await deleteRecord(data.id);
            if (result.errors) {
              toast({
                title: "Fail to delete data",
                description: `Reasoning: ${result.errors.join(", ")}`,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
            } else {
              toast({
                title: `Successfully deleted "${result.data.name}"`,
                description: `Record of id: ${result.data.id} is deleted`,
                status: "success",
                duration: 2000,
                isClosable: true,
              });
            }
          }}
          icon={<CloseIcon />}
        />
      </Flex>
    </Flex>
  );
};

export default IncidentView;
