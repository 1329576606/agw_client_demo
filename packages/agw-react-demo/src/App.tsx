import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { Login } from "./components/Login";

const config = {
  testnet: true, // Required
  // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
  // transport: http("https://your.abstract.node.example.com/rpc") // Optional
};

function App() {
  return (
    <div className="App">
      <h1>AGW React Demo</h1>
      <AbstractWalletProvider config={config}>
        <Login />
        {/* <WalletStatus /> */}
      </AbstractWalletProvider>
    </div>
  )
}

export default App
