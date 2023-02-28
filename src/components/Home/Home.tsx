import { useEffect, useState } from "react";
import TransactionForm from "./TransactionForm";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks";
import { useFirestore } from "../../hooks/useFirestore";
import TransactionList from "./TransactionList";
import {
  addTransactions,
  deleteTransaction,
} from "../../redux/transactionSlice";
import { setTitleTab } from "../../redux/appSlice";

import "./Home.css";

const Home = () => {
  const transactions = useAppSelector(
    (state) => state.transaction.transactions
  );
  const [loading, setLoading] = useState<boolean>(true);

  const { error, getTransactions, deleteDoc } = useFirestore();
  const dispatch = useAppDispatch();

  const handleDeleteTransaction = (id?: string) => {
    if (!id) {
      return;
    }

    console.log(id);
    deleteDoc(id);
    dispatch(deleteTransaction(id));
  };

  useEffect(() => {
    const getTransactionsLocal = async () => {
      setLoading(true);
      const temp = await getTransactions();
      if (temp) {
        dispatch(addTransactions(temp));
      }

      setLoading(false);
    };

    getTransactionsLocal();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(setTitleTab("Home"));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(error);
  return (
    <div className="container">
      <title>test</title>
      <div className="content">
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
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
