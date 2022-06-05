const Cart = require('../models/cart');

exports.addItemToCart = (req, res) => {

    Cart.findOne({user:req.user._id})
    .exec((error,cart)=>{
        if (error) return res.status(400).json({error});
        if (cart){
            // if cart already exists then update cart by quantity

            const product=req.body.cartItems.product;
            const item=cart.cartItems.find(c => c.product==product);

            if (item){
                Cart.findOneAndUpdate({ user:req.user._id ,"cartItems.product":product},{
                    "$set":{
                        "cartItems.$":{
                            ...req.body.cartItems,
                            quantity:item.quantity+req.body.cartItems.quantity
                        }
                    }
                })
                .exec((error,_cart)=>{
                    if (error) return res.status(400).json({ error });
                    if (_cart) {
                        return res.status(201).json({ _cart });
                    }
                });
            }else{
                Cart.findOneAndUpdate({ user:req.user._id },{
                    "$push":{
                        "cartItems":req.body.cartItems
                    }
                })
                .exec((error,cart)=>{
                    if (error) return res.status(400).json({ error });
                    if (cart) {
                        return res.status(201).json({ cart });
                    }
                });
            }
            // return res.status(201).json({message:cart});
        }
        else{
            const cart = new Cart({
                user: req.user._id,
                cartItems: [req.body.cartItems]//bracket lagaya isliye post request me bracket hataya
            });
        
            cart.save((error, cart) => {
                if (error) return res.status(400).json({ error });
                if (cart) {
                    return res.status(201).json({ cart });
                }
            });
        }
    });
};