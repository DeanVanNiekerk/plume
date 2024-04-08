import { ChakraBaseProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { theme } from './theme/theme.ts';
// import { ChainProvider } from "@cosmos-kit/react";
// import { chains, assets } from "chain-registry";
// import { wallets } from "cosmos-kit";
// import { wallets } from "@cosmos-kit/keplr";
// import { assetList, chain } from "./config/laconic.ts";

// Import this in your top-level route/layout
// import "@interchain-ui/react/styles";

// console.log({
//   chains,
//   assets,
//   wallets,
// });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <ChainProvider
      chains={[chain]}
      assetLists={[assetList]}
      wallets={wallets}
      walletConnectOptions={{
        signClient: {
          projectId: "d70860c8c9fd5dc2a9d0ea669ea07491",
          relayUrl: "wss://relay.walletconnect.org",
          metadata: {
            name: "CosmosKit Template",
            description: "CosmosKit dapp template",
            url: "https://docs.cosmology.zone/cosmos-kit/",
            icons: [],
          },
        },
      }}
       signerOptions={{
         preferredSignType: () => {
           return "direct";
         },
      }}
    > */}
    <ChakraBaseProvider theme={theme}>
      <App />
    </ChakraBaseProvider>
    {/* </ChainProvider> */}
  </React.StrictMode>,
);
