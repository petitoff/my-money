import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import { useAppDispatch } from "../../hooks/hooks";
import { addTransaction } from "../../redux/transactionSlice";

const TransactionForm = () => {
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const { addDoc } = useFirestore();
  const dipatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const transaction = {
      name,
      amount: parseInt(amount),
    };

    setName("");
    setAmount("");

    await addDoc(transaction);
    dipatch(addTransaction(transaction));
  };

  return (
    <>
      <h3>Add a transaction</h3>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>

        <label>
          <span>{`Amount ($):`}</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>

        <button>Add transaction</button>
      </form>
    </>
  );
};

export default TransactionForm;
