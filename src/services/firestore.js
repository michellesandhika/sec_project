import { collection, getDocs, getDoc, doc, setDoc, deleteDoc, updateDoc } from 'firebase/firestore';
import { firestore } from './config';
import { getAuth } from 'firebase/auth';

export const getItems = async () => {
    let items = [];
    const response = await getDocs(collection(firestore, 'Item'));
    
    response.forEach((item) => {
        items.push({ id: item.id, ...item.data() });
    });

    return items;
};

export const getItem = async (id) => {
    let item = await getDoc(doc(firestore, "Item", id));
    return item;
};

export const getTransactions = async () => {
    let transactions = [];
    const response = await getDocs(collection(firestore, 'Transaction'));
    
    response.forEach((item) => {
        transactions.push({ id: item.id, ...item.data() });
    });

    return transactions;
};

export const uploadItem = async() => {

};

export const getCurrentUser = () => {
    const auth = getAuth();
    const user = auth.currentUser;

    return user.email;
}

export const addItemToUser = async(ipfsLink, user) =>{
    let imagesCollection = collection(firestore, 'Users', user, 'images')
    await setDoc(doc(imagesCollection, ipfsLink), {});
};

export const removeItemFromUser = async (ipfsLink, owner) => {
    //TODO: retrieve the item's owner.
    let imagesCollection = collection(firestore, 'Users', owner, 'images')
    await deleteDoc(doc(imagesCollection, ipfsLink));
};

export const updateOwner = async (ipfsLink, user) => {
    let itemDetail = doc(firestore, "Item", ipfsLink)
    await updateDoc(itemDetail, {"Owner": user})
}

export const updateSaleStatus = async(ipfsLink, saleBoolean) => {
    let itemDetail = doc(firestore, "Item", ipfsLink)
    await updateDoc(itemDetail, {"ForSale": saleBoolean})
}

export const changingOwnership = (oldUser, newUser, ipfsLink) => {
    removeItemFromUser(ipfsLink, oldUser);
    addItemToUser(ipfsLink, newUser);
    updateOwner(ipfsLink, newUser);
    updateSaleStatus(ipfsLink, false);
}