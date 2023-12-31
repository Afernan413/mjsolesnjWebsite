import {mongooseConnect} from "@/lib/mongoose";
import {Product} from "@/models/Product";
import {order} from "@/models/order";
const stripe = require('stripe')(process.env.STRIPE_SK)

export default async function handler(req,res){
    if(req.method!== 'POST'){
        res.json('should be a POST request')
        return;
    }
    const{
        name,email,city,zipcode,streetAddress,country,products,cartProducts,
    } = req.body;
    await mongooseConnect()
    const productsIds = cartProducts;
    const uniqueIds = [...new Set(productsIds)]
    const productsInfos= await Product.find({_id:uniqueIds})

    let line_items=[];

    for(const productId of uniqueIds){
        const productInfo = productsInfos.find(p=>p._id.toString()===productId);
        const quantity = productsIds.filter(id => id === productId)?.length || 0;
        if(quantity > 0 && productInfo){
            line_items.push({
                quantity,
                price_data: {
                    currency: 'USD',
                    product_data:{name:productInfo.title},
                    unit_amount: quantity * productInfo.price * 100,
                },
            });
        }

    }
    const orderDoc = await order.create({
        line_items,name,email,city,zipcode,streetAddress,country,paid:false
    })

    const session = await stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        customer_email: email,
        success_url:process.env.PUBLIC_URL + '/cart?success=true',
        cancel_url:process.env.PUBLIC_URL + '/cart?cancelled=true',
        metadata:{orderID:orderDoc._id.toString()}
    });

    res.json({
        url:session.url,

    })
}