import { useState, useEffect } from "react";
import { Modal } from "./Modal";
import { parseEther, parseGwei, formatEther, formatGwei } from "viem";
import { useAccount, useEstimateGas, useFeeData, useSendTransaction } from "wagmi";

interface SendTransactionProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SendTransaction({ isOpen, onClose }: SendTransactionProps) {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [gasLimit, setGasLimit] = useState("");
  const [gasPrice, setGasPrice] = useState("");
  const [data, setData] = useState("");

  const { address } = useAccount();
  const { data: estimatedGas } = useEstimateGas({
    to,
    value: amount ? parseEther(amount) : undefined,
    data: data || undefined,
  });

  const { data: feeData } = useFeeData({
    watch: true,
  });

  // 计算预估费用
  const calculateEstimatedFee = () => {
    if (!estimatedGas || !feeData?.maxFeePerGas) return null;
    const gasFee = estimatedGas * feeData.maxFeePerGas;
    return formatEther(gasFee);
  };

  const estimatedFee = calculateEstimatedFee();
  const currentGasPrice = feeData?.maxFeePerGas ? formatGwei(feeData.maxFeePerGas) : null;

  const { sendTransaction } = useSendTransaction();

  const handleSend = () => {
    if (!to || !amount) return;

    sendTransaction({
      to,
      value: parseEther(amount),
      gas: gasLimit ? BigInt(gasLimit) : undefined,
      maxFeePerGas: gasPrice ? parseGwei(gasPrice) : undefined,
      data: data || undefined,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Send Transaction">
      <div className="send-transaction">
        <div className="required-fields">
          <div className="input-group">
            <label>To Address *</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="0x..."
            />
          </div>

          <div className="input-group">
            <label>Amount (ETH) *</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.0"
            />
          </div>
        </div>

        <div className="gas-estimate">
          <div className="gas-estimate-item">
            <span>Estimated Gas:</span>
            <span>{estimatedGas ? estimatedGas.toString() : '-'}</span>
          </div>
          <div className="gas-estimate-item">
            <span>Gas Price:</span>
            <span>{currentGasPrice ? `${Number(currentGasPrice).toFixed(2)} Gwei` : '-'}</span>
          </div>
          <div className="gas-estimate-item">
            <span>Estimated Fee:</span>
            <span>{estimatedFee ? `${Number(estimatedFee).toFixed(8)} ETH` : '-'}</span>
          </div>
        </div>

        <div className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)}>
          <span>Advanced Options</span>
          <span className={`toggle-icon ${showAdvanced ? 'open' : ''}`}>▼</span>
        </div>

        {showAdvanced && (
          <div className="advanced-fields">
            <div className="gas-settings">
              <div className="input-group">
                <label>Gas Limit</label>
                <input
                  type="text"
                  value={gasLimit}
                  onChange={(e) => setGasLimit(e.target.value)}
                  placeholder={estimatedGas?.toString() || "Gas Limit"}
                />
              </div>
              <div className="input-group">
                <label>Gas Price (Gwei)</label>
                <input
                  type="text"
                  value={gasPrice}
                  onChange={(e) => setGasPrice(e.target.value)}
                  placeholder={currentGasPrice ? `${Number(currentGasPrice).toFixed(2)}` : "Gas Price"}
                />
              </div>
            </div>

            <div className="input-group">
              <label>Data (Hex)</label>
              <input
                type="text"
                value={data}
                onChange={(e) => setData(e.target.value)}
                placeholder="0x"
              />
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
          <button
            className="send-button"
            onClick={handleSend}
            disabled={!to || !amount}
          >
            Send
          </button>
        </div>
      </div>
    </Modal>
  );
}
