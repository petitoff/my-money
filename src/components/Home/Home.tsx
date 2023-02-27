import TransactionForm from "./TransactionForm";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useFirestore } from "../../hooks/useFirestore";
import TransactionList from "./TransactionList";

import "./Home.css";
import { useEffect } from "react";
import {
  addTransactions,
  deleteTransaction,
} from "../../redux/transactionSlice";

const Home = () => {
  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );

  const { getTransactions, deleteDoc } = useFirestore();
  const dispatch = useAppDispatch();

  const handleDeleteTransaction = (id?: string) => {
    if (!id) {
      return;
    }

    deleteDoc(id);
    dispatch(deleteTransaction(id));
  };

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
        {transactions && (
          <TransactionList
            transactions={transactions}
            useDeleteTransaction={handleDeleteTransaction}
          />
        )}
      </div>
      <div className="sidebar">
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
