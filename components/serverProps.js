import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";

export default async function getServerSideProps(){

////////////////////////////////////////////////////////////////////////////////////////
//GET THE 5 LATEST PRODUCTS ADDED
///////////////////////////////////////////////////////////////////////////////////////
    // Category ID Values
    // FootwearId is 64f4a1bc1824417e859001cb
    // ApparelID is 64f4a9de4e4de853b84b9a54
    await mongooseConnect()
    const RecentFootwearUsed = await Product.find({'properties.Condition': "Used", category:'64f4a1bc1824417e859001cb'}, null, {sort: {'_id':-1}});
    const RecentFootwearNew = await Product.find({'properties.Condition': "New", category:'64f4a1bc1824417e859001cb'}, null, {sort: {'_id':-1}});
    const allFootwear = await Product.find({category:'64f4a1bc1824417e859001cb'}, null, {sort: {'_id':-1}});
    const RecentProductsAll = await Product.find({}, null, {sort: {'_id':-1}});
    const AdidasFootwear = await Product.find({'brand' : 'Adidas'}, null, {sort: {'_id':-1}});
    const NikeFootwear = await Product.find({'brand' : 'Nike'}, null, {sort: {'_id':-1}});
    const NewBalFootwear = await Product.find({'brand' : 'New Balance'}, null, {sort: {'_id':-1}});
    const JordanFootwear = await Product.find({'brand' : 'Jordan'}, null, {sort: {'_id':-1}});
    const allApparel = await Product.find({category:'64f4a9de4e4de853b84b9a54'}, null, {sort: {'_id':-1}});
    return{
        props: {
            TenRecentProductsUsed: JSON.parse(JSON.stringify(RecentFootwearUsed)),
            TenRecentProductsNew: JSON.parse(JSON.stringify(RecentFootwearNew)),
            RecentProductsAll: JSON.parse(JSON.stringify(RecentProductsAll)),
            allFootwear: JSON.parse(JSON.stringify(allFootwear)),
            AdidasFootwear: JSON.parse(JSON.stringify(AdidasFootwear)),
            NikeFootwear: JSON.parse(JSON.stringify(NikeFootwear)),
            NewBalFootwear: JSON.parse(JSON.stringify(NewBalFootwear)),
            JordanFootwear: JSON.parse(JSON.stringify(JordanFootwear)),
            allApparel: JSON.parse(JSON.stringify(allApparel))}

    };

}