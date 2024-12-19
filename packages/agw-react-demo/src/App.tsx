import { AbstractWalletProvider } from "@abstract-foundation/agw-react";
import { Login } from "./components/Login";
import { Account } from "./components/Account";

const config = {
  testnet: true,
};

function App() {
  return (
    <div className="App">
      <AbstractWalletProvider config={config}>
        <header className="app-header">
          <h1>AGW React Demo</h1>
          <div className="header-right">
            <Account />
            <Login />
          </div>
        </header>
      </AbstractWalletProvider>
    </div>
  )
}

export default App
