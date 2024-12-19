import { useLoginWithAbstract } from '@abstract-foundation/agw-react';
import { useAccount } from "wagmi";
export function Login() {
  const { status } = useAccount();
  const { login,logout } = useLoginWithAbstract();
  return (
    <div className="login-container">
      {status == "connected" ?<></>:<button 
        onClick={login}
        className="login-button"
      >
        {status=="connected" ? 'Connecting...' : 'Connect Wallet'}
      </button>}
      {status == "connected"?<button 
        onClick={logout}
        className="login-button"
      >
        {status!="connected" ? 'Logging out...' : 'Logout'}
      </button>:<></>}
    </div>
  );
}
