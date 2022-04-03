import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc, query, where } from 'firebase/firestore';
import { firestore } from './config';

export const getItem = async (id) => {
    let item = await getDoc(doc(firestore, 'Item', id));
    return item;
};

export const getItems = async () => {
    let items = [];
    const response = await getDocs(collection(firestore, 'Item'));
    
    response.forEach((item) => {
        items.push({ id: item.id, ...item.data() });
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

export const uploadItem = async () => {

};

export const addItemToUser = async (ipfsLink, user) =>{
    let imagesCollection = collection(firestore, 'Users', user, 'images')
    await setDoc(doc(imagesCollection, ipfsLink), {});
};

export const removeItemFromUser = async (ipfsLink, owner) => {
    let imagesCollection = collection(firestore, 'Users', owner, 'images')
    await deleteDoc(doc(imagesCollection, ipfsLink));
};

export const updateOwner = async (ipfsLink, user) => {
    let itemDetail = doc(firestore, 'Item', ipfsLink);
    await updateDoc(itemDetail, { 'Owner': user });
};

export const updateSaleStatus = async (ipfsLink, saleBoolean) => {
    let itemDetail = doc(firestore, 'Item', ipfsLink);
    await updateDoc(itemDetail, { 'ForSale': saleBoolean });
};

export const changingOwnership = (oldUser, newUser, ipfsLink) => {
    removeItemFromUser(ipfsLink, oldUser);
    addItemToUser(ipfsLink, newUser);
    updateOwner(ipfsLink, newUser);
    updateSaleStatus(ipfsLink, false);
};