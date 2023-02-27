import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import firebase from "firebase/app";

export interface Transaction {
  id?: string;
  name?: string;
  amount?: number;
  createdAt?: firebase.firestore.Timestamp;
}

export interface TransactionState {
  transactions: Transaction[];
}

const initialState: TransactionState = {
  transactions: [],
};

export const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
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
    clearTransactions: (state) => {
      state.transactions = [];
    },
  },
});

export const {
  addTransaction,
  addTransactions,
  deleteTransaction,
  clearTransactions,
} = transactionSlice.actions;
export default transactionSlice.reducer;
