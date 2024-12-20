import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { useState } from "react";
import { useAccount } from 'wagmi';
import { Account } from "./components/Account";
import { Login } from "./components/Login";
import { SendTransaction } from "./components/SendTransaction";
import { Demos } from "./components/Demos";

const config = {
  testnet: true,
};

function AppContent() {
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const { status } = useAccount();
  const isConnected = status === 'connected';

  return (
    <div className="App">
      <header className="app-header">
        <h1>AGW React Demo</h1>
        <div className="header-right">
          <Account />
          <Login />
        </div>
      </header>
      <main className="app-main">
        {isConnected && (
          <div className="floating-send">
            <button
              onClick={() => setIsTransactionModalOpen(true)}
              className="send-button"
            >
              Send
            </button>
          </div>
        )}
      <Demos />
      </main>
      <SendTransaction
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
      />
    </div>
  );
}

function App() {
  return (
    <AbstractWalletProvider config={config}>
      <AppContent />
    </AbstractWalletProvider>
  );
}

export default App
