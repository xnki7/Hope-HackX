import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultConfig,
  RainbowKitProvider,
  lightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { polygonAmoy } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { NextUIProvider } from "@nextui-org/react";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

const queryClient = new QueryClient();

const config = getDefaultConfig({
  appName: "Hope",
  projectId: "f5b18d2f3c2481066e5b5280ee8d30b2D",
  chains: [polygonAmoy],
  // ssr: true,
});

createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#229799",
          accentColorForeground: "white",
          borderRadius: "medium",
        })}
      >
        <BrowserRouter>
          <Provider store={store}>
            <NextUIProvider>
              <App />
            </NextUIProvider>
          </Provider>
        </BrowserRouter>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
