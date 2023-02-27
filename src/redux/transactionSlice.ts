import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export interface Transactions {
  id?: string;
  name?: string;
  amount?: number;
  createdAt?: firebase.firestore.Timestamp;
}

export interface TransactionState {
  transactions: Transactions[];
}

const initialState: TransactionState = {
  transactions: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transactions>) => {
      state.transactions.push(action.payload);
    },
    addTransactions: (state, action) => {
      state.transactions = action.payload;
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const { addTransaction, addTransactions, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
