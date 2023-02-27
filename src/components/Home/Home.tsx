import TransactionForm from "./TransactionForm";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useFirestore } from "../../hooks/useFirestore";
import TransactionList from "./TransactionList";

import "./Home.css";
import { useEffect } from "react";
import { addTransactions } from "../../redux/transactionSlice";

const Home = () => {
  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );

  const { getTransactions } = useFirestore();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getTransactionsLocal = async () => {
      const temp = await getTransactions();
      if (temp) {
        dispatch(addTransactions(temp));
      }
    };

    getTransactionsLocal();
  }, []);

  return (
    <div className="container">
      <div className="content">
        {transactions && <TransactionList transactions={transactions} />}
      </div>
      <div className="sidebar">
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
