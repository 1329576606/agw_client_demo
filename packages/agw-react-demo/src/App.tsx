import { AbstractWalletProvider } from "@abstract-foundation/agw-react";

const config = {
  testnet: true, // Required
  // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
  // transport: http("https://your.abstract.node.example.com/rpc") // Optional
};

function App() {
  // login function to prompt the user to sign in with AGW.
  return (
    <div className="App">
      <h1>AGW React Demo</h1>
      <AbstractWalletProvider config={config}>
        {/* Your application components */}
      </AbstractWalletProvider>
    </div>
  )
}

export default App
