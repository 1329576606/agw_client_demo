import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { useState } from 'react';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';

const config = {
  testnet: true, // Required
  // Optionally, provide your own RPC URL (learn more: https://viem.sh/docs/clients/transports/http.html)
  // transport: http("https://your.abstract.node.example.com/rpc") // Optional
};

function App() {
  const [account, setAccount] = useState<any>(null)

  const initializeWallet = async () => {
    try {
      const privateKey = generatePrivateKey()
      console.log('Private key:', privateKey)
      const newAccount = privateKeyToAccount(privateKey)
      setAccount(newAccount)
    } catch (error) {
      console.error('Error initializing wallet:', error)
    }
  }

  return (
    <div className="App">
      <h1>AGW React Demo</h1>
      {!account ? (
        <button onClick={initializeWallet}>Initialize Wallet</button>
      ) : (
        <AbstractWalletProvider config={config}>
      {/* Your application components */}
    </AbstractWalletProvider>
      )}
    </div>
  )
}

export default App
