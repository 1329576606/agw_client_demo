import { useState } from 'react';
import { useAccount, useEstimateGas, useSendTransaction } from 'wagmi';
import { parseEther, parseGwei } from 'viem';
import { Modal } from './Modal';

interface SendTransactionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendTransaction({ isOpen, onClose }: SendTransactionProps) {
  const { address } = useAccount();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState('');
  const [customGas, setCustomGas] = useState('');
  const [customGasPrice, setCustomGasPrice] = useState('');

  const { data: estimatedGas } = useEstimateGas({
    to,
    value: amount ? parseEther(amount) : undefined,
    data: data || undefined,
  });

  const { sendTransaction, isPending } = useSendTransaction();

  const handleSend = () => {
    if (!to || !amount) return;

    const transaction = {
      to,
      value: parseEther(amount),
      data: data || undefined,
    };

    if (customGas) {
      transaction.gas = BigInt(customGas);
    }
    if (customGasPrice) {
      transaction.gasPrice = parseGwei(customGasPrice);
    }

    sendTransaction(transaction, {
      onSuccess: () => {
        onClose();
        // Reset form
        setTo('');
        setAmount('');
        setData('');
        setCustomGas('');
        setCustomGasPrice('');
      },
    });
  };

  if (!address) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Transaction">
      <div className="send-transaction">
        <div className="input-group">
          <label>
            To Address:
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="0x..."
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Amount (ETH):
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
            />
          </label>
        </div>
        <div className="input-group">
          <label>
            Data (hex):
            <input
              type="text"
              value={data}
              onChange={(e) => setData(e.target.value)}
              placeholder="0x..."
            />
          </label>
        </div>
        <div className="gas-settings">
          <h3>Gas Settings</h3>
          <div className="gas-info">
            Estimated Gas: {estimatedGas?.toString() || 'N/A'}
          </div>
          <div className="input-group">
            <label>
              Custom Gas Limit:
              <input
                type="text"
                value={customGas}
                onChange={(e) => setCustomGas(e.target.value)}
                placeholder="Enter gas limit"
              />
            </label>
          </div>
          <div className="input-group">
            <label>
              Custom Gas Price (Gwei):
              <input
                type="text"
                value={customGasPrice}
                onChange={(e) => setCustomGasPrice(e.target.value)}
                placeholder="Enter gas price in Gwei"
              />
            </label>
          </div>
        </div>
        <div className="modal-actions">
          <button onClick={onClose} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!to || !amount || isPending}
            className="send-button"
          >
            {isPending ? 'Sending...' : 'Send Transaction'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
