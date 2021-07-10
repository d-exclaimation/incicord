import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import "../styles/snippet.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
