
// import clientPromise from "./mongodb";

// export async function updateWish(id){
//     const client = await clientPromise;

//     const db = client.db("bryllup");
  
//     let wishes = await db.collection("wishes").find({id}).toArray();
//     wishes = JSON.parse(JSON.stringify(wishes));

//     return wishes;
// }