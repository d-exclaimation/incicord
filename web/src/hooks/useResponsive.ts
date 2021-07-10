//
//  useResponsive.ts
//  incicord
//
//  Created by d-exclaimation on 21:54.
//

import { useMediaQuery } from "@chakra-ui/react";

export function useResponsive() {
  const [isMobile, isPortrait, isLandScape] = useMediaQuery([
    "(max-width: 768px)",
    "(orientation: portrait)",
    "(orientation: landscape)",
  ]);

  return {
    isMobile,
    isPortrait,
    isLandScape,
  };
}
