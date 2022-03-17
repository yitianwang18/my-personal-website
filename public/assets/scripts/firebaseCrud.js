import { getFirestore, collection, doc, getDoc, getDocs, addDoc, setDoc, deleteDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";

export const db = getFirestore();
const collectionStr = "blog";

export async function getBlogAll(bloghandler){
    const querySnapshot = await getDocs(collection(db, collectionStr));
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        if (typeof bloghandler == "function") {
            bloghandler(doc.id, doc.data());
        }
    });
}

export async function postBlog(blogData, user){
    blogData.date = serverTimestamp(); 
    blogData.author = user;
    const docRef = await addDoc(collection(db, collectionStr), blogData);
    const docSnap = await getDoc(docRef);
    return [docRef, docSnap.data()];
}

export async function editBlog(blogData, id, user){
    blogData.date = serverTimestamp();
    blogData.author = user;
    const docRef = doc(db, collectionStr, id)
    await setDoc(docRef, blogData); 
    const docSnap = await getDoc(docRef);
    return [docRef, docSnap.data()];
}

export async function deleteBlog(id){
    const docRef = await deleteDoc(doc(db, collectionStr, id));
    return docRef;
}