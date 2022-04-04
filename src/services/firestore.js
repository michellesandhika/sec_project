import { collection, getDocs, getDoc, doc, addDoc, setDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { firestore } from './config';

export const getTransactions = async () => {
    let transactions = [];
    const response = await getDocs(collection(firestore, 'Transaction'));
    
    response.forEach((item) => {
        transactions.push({ id: item.id, ...item.data() });
    });

    return transactions;
};

export const getTransactionsFromUser = async (user) => {
    let transactions = [];
    const buyer = await getDocs(query(collection(firestore, 'Transaction'), where('Buyer', '==', user)));
    const seller = await getDocs(query(collection(firestore, 'Transaction'), where('Seller', '==', user)));

    buyer.forEach((item) => {
        transactions.push({ Id: item.id, Type: 'Bought', ...item.data() });
    });
    
    seller.forEach((item) => {
        transactions.push({ Id: item.id, Type: 'Sold', ...item.data() });
    });

    return transactions;
};

export const createTransactionRecord = async (record) => {
    await addDoc(collection(firestore, 'Transaction'), record);
};

export const removeTransactions = async (user) => {
    let transactions = [];
    const response = await getDocs(query(collection(firestore, 'Transaction'), where('Buyer', '==', user)));

    response.forEach((item) => {
        transactions.push(item.id);
    });

    for (const transaction of transactions) {
        await deleteDoc(doc(collection(firestore, 'Transaction'), transaction));
    }
};

export const createItem = async (id, content) => {
    await setDoc(doc(firestore, 'Item', id), content);
};

export const checkDuplicateItems = async (id) => {
    let item = await getItem(id);
    return item.exists();
};

export const getItem = async (id) => {
    let item = await getDoc(doc(firestore, 'Item', id));
    return item;
};

export const getItems = async (user) => {
    let items = [];
    let response;

    if (user) 
        response = await getDocs(query(collection(firestore, 'Item'), where('Owner', '!=', user)));
    else 
        response = await getDocs(collection(firestore, 'Item'));

    response.forEach((item) => {
        items.push({ Id: item.id, ...item.data() });
    });

    return items;
};

export const getItemsFromUser = async (user) => {
    let ids = [];
    let items = [];
    const response = await getDocs(collection(firestore, 'Users', user, 'images'));
    
    response.forEach((item) => {
        ids.push(item.id);
    });
    
    for (const id of ids) {
        const item = await getItem(id);
        items.push({ Id: item.id, ...item.data()});
    }

    return items;
};

export const addItemToUser = async (id, user) =>{
    await setDoc(doc(collection(firestore, 'Users', user, 'images'), id), {});
};

export const removeItemFromUser = async (id, owner) => {
    await deleteDoc(doc(collection(firestore, 'Users', owner, 'images'), id));
};

export const removeItemFromDatabase = async (id) => {
    await deleteDoc(doc(collection(firestore, 'Item'), id));
};

export const updateOwner = async (id, user) => {
    await updateDoc(doc(firestore, 'Item', id), { 'Owner': user });
};

export const changingOwnership = async (oldUser, newUser, id) => {
    await removeItemFromUser(id, oldUser);
    await addItemToUser(id, newUser);
    await updateOwner(id, newUser);
};

export const addUserToDatabase = async (user) => {
    await setDoc(doc(firestore, 'Users', user), {});
};

export const checkDuplicateUsers = async (user) => {
    let document = await getDoc(doc(firestore, 'Users', user));
    return document.exists();
};

export const removeUser = async (user) => {
    await deleteDoc(doc(collection(firestore, 'Users'), user));
};

export const deleteAccount = async (user) => {
    const items = await getItemsFromUser(user);

    for (const item of items) {        
        await removeItemFromUser(item.Id, item.Owner);
        await removeItemFromDatabase(item.Id);
    }
    
    await removeTransactions(user);
    await removeUser(user);
};