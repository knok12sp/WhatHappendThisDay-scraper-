const scraper= require("./scraper");
const admin=require("firebase-admin");
const  functions  = require("firebase-functions");

admin.initializeApp();
const db= admin.firestore();

const getToday=()=>{
    const today = new Date();

    return `${today.getDate()}${today.getMonth()+1}${today.getFullYear()}`;
};
/*The pubsub function doesn't run automaticaly,you have manually call it in the terminal.I don't know why it doesn't run, if I figure it out I will update it */
exports.pubsub=functions
    .region("europe-west3")
    .runWith({memory: '2GB'})
    .pubsub.schedule('0 7 * * *')
    .timeZone('CET')
    .onRun(async ()=>{
        try{
             const scrapedData=   await scraper.start();
                return db.collection('days').doc(getToday()).set(scrapedData);
        }catch(error){
                throw new Error(error);
        }
    })