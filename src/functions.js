import{ getDoc, doc} from "@firebase/firestore/lite";
import{db} from "./main";

export async function getThisDayEvents(day){
    const daysRef= doc(db,`days/${day}`);
    const docSnap= await getDoc(daysRef);

    return docSnap.data();
}

export const getFormatedDay= (day) =>{
    return `${day.getDate()}${day.getMonth()+1}${day.getFullYear()}`;
}