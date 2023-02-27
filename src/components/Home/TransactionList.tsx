import { DocProps } from "../../hooks/useFirestore";

interface Props {
  transactions: DocProps[];
}

const TransactionList = ({ transactions }: Props) => {
  console.log(transactions, "here");

  return (
    <ul className="transactions">
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <p className="name">{transaction.name}</p>
          <p className="amount">${transaction.amount}</p>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;
