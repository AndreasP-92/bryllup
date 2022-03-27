import clientPromise from "../../lib/mongodb";
import {ObjectId} from 'mongodb';
// import {ObjectId} from 'bson';

export default async function handler(req, res) {
    const id = req.body._id;
    const client = await clientPromise;
    const db = client.db("bryllup");

    try {
        const wishes = await db.collection("wishes").find({_id : ObjectId(id)}).toArray();
        const wishesObj = wishes[0];

        const query = {_id : ObjectId(id)};
        const update = {
            $set:{checked:wishesObj.checked +1}
        };
        const option = {upsert: true};

        const updateWishes = await db.collection("wishes").updateOne(query,update ,option);
        return res.json({
            object : updateWishes,
            success: true,
            msg     : "One item were updated",
            status  : 201
        });
    } catch (error) {
        return res.json({
            object : {},
            success: false,
            msg     : "OOPS, something went wrong in getOneDeliveryMethod" + error,
            status  : 405
        });
    };
}