import { Switch, useColorMode } from "@chakra-ui/react";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Switch
      colorScheme="blackAlpha"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
