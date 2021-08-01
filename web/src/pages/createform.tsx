//
//  createform.tsx
//  web
//
//  Created by d-exclaimation on 16:15.
//

import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import Main from "../components/shared/semantic/Main";
import { createIncident } from "../models/Incident";

type Severity = "none" | "calm" | "mild" | "severe";

const Createform: React.FC = () => {
  const [name, setName] = useState("");
  const [severity, setSeverity] = useState<Severity>("mild");
  const [lastOccurred, setLastOccurred] = useState(new Date());
  const onSubmit = useCallback(() => {
    console.log(
      createIncident({
        name,
        lastOccurred,
        severity,
      })
    );
    setName("");
    setSeverity("mild");
    setLastOccurred(new Date());
  }, [name, severity, lastOccurred]);

  // Color mode config
  const filter = useColorModeValue("unset", "invert(1)");
  const bg = useColorModeValue("gray.50", "gray.700");
  const invertBg = useColorModeValue(bg, "#d1c8b6");
  const invertBorder = useColorModeValue("blue.500", "orange.600");
  return (
    <Main>
      <Stack spacing="24px" mx="4" maxW="90vw">
        <Heading>Create a new incident record</Heading>
        <Box>
          <FormLabel htmlFor="title">Title</FormLabel>
          <Input
            bg={bg}
            id="username"
            value={name}
            placeholder="Please enter incident title"
            onChange={(e) => setName(e.target.value)}
          />
        </Box>

        <Box>
          <FormLabel htmlFor="severity">Select severity</FormLabel>
          <Select
            bg={bg}
            id="severity"
            value={severity}
            onChange={(e) => setSeverity(e.target.value as Severity)}
          >
            <option value="none">No priority (none)</option>
            <option value="calm">Laid-back (calm)</option>
            <option value="mild">Quite serious (mild)</option>
            <option value="severe">Very serious (severe)</option>
          </Select>
        </Box>

        <Box>
          <FormLabel htmlFor="desc">Date of last occurrence</FormLabel>
          <Input
            bg={invertBg}
            focusBorderColor={invertBorder}
            type="date"
            value={getFormattedDate(lastOccurred)}
            color="black"
            filter={filter}
            onChange={(e) => {
              const date = e.target.valueAsDate;
              if (!date) return;
              setLastOccurred(date);
            }}
          />
        </Box>

        <Flex justifyContent="space-between">
          <Box />
          <Button colorScheme="whatsapp" onClick={onSubmit}>
            Create
          </Button>
        </Flex>
      </Stack>
    </Main>
  );
};

const getFormattedDate = (date: Date) => date.toISOString().split("T")[0];

export default Createform;
