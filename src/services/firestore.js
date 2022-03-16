import { collection, getDocs } from 'firebase/firestore';
import { firestore } from './config';

export const getItems = async () => {
    let items = [];
    const response = await getDocs(collection(firestore, 'items'));
    
    response.forEach((item) => {
        items.push({ id: item.id, ...item.data() });
    });

    return items;
};