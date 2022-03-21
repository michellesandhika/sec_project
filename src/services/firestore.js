import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './config';

export const getItems = async () => {
    let items = [];
    const response = await getDocs(collection(firestore, 'Item'));
    
    response.forEach((item) => {
        items.push({ id: item.id, ...item.data() });
    });

    return items;
};

export const getTransactions = async () => {
    let transactions = [];
    const response = await getDocs(collection(firestore, 'Transaction'));
    
    response.forEach((item) => {
        transactions.push({ id: item.id, ...item.data() });
    });

    return transactions;
};