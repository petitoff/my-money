import TransactionForm from "./TransactionForm";
import { useAppSelector } from "../../hooks/hooks";
import { useFirestore } from "../../hooks/useFirestore";
import TransactionList from "./TransactionList";
import { DocProps } from "../../hooks/useFirestore";

import "./Home.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [docs, setDocs] = useState<DocProps[]>([]);
  const transactions = useAppSelector((state) => state.user.user.firestoreData);

  const { getTransactions } = useFirestore();

  useEffect(() => {
    const getTransactionsLocal = async () => {
      const temp = await getTransactions();
      if (temp) {
        setDocs(temp);
      }
    };

    getTransactionsLocal();
  }, []);

  return (
    <div className="container">
      <div className="content">
        {docs && <TransactionList transactions={docs} />}
      </div>
      <div className="sidebar">
        <TransactionForm />
      </div>
    </div>
  );
};

export default Home;
