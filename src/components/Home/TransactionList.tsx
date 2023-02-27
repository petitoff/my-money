import { DocProps } from "../../hooks/useFirestore";

interface Props {
  transactions: DocProps[];
  useDeleteTransaction: (id?: string) => void;
}

const TransactionList = ({ transactions, useDeleteTransaction }: Props) => {
  const handleDeleteTransaction = useDeleteTransaction;

  return (
    <ul className="transactions">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className="name">{transaction.name}</p>
          <p className="amount">${transaction.amount}</p>
          <button onClick={() => handleDeleteTransaction(transaction.id)}>
            x
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
