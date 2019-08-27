// import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import User from './models/user';
import Address from './models/addresses';
import Card from './models/cards';

const express=require('express');
const app=express(); // calling a function inside express

const router=express.Router();
app.use(cors());
// const bodyParser=require('body-parser'); //used it to automatically use middleware's form details

// app.use(bodyParser.urlencoded({extended:false,type:'application/x-www-form-urlencoded'}));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use('',router); 

mongoose.connect('mongodb+srv://vibhor:vibhor@vibhorvaishdb-sm4et.mongodb.net/eKart?retryWrites=true&w=majority');

const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("mongoDb connection is established successfully");
});

// router.route('/').get((req,res)=>{
//     console.log("hello");
//     res.write("hello from the start");
//     res.end();
// });

router.route('/users/:emailId').get((req,res)=>{
    let emailToSearchFor=req.params.emailId;
    console.log("backend handling emailid: "+emailToSearchFor);
    User.find({emailAddress:emailToSearchFor})
    .then((user)=>
        // ,(err,user)=>{
        // if(!err)
            {
                console.log(" found another user with same emailaddress , user: "+user[0].name);
                // return (new Error(' found another user with same emailaddress'));
                // res.send(404).statusMessage('fail');
                // res.end();
                res.json({user:"found"});
                res.end();
            }
    )
    .catch((err)=>
        // else
            {
                res.json({user:"not found"});
                res.end();
            }
        );
    // });
});

router.route('/users/add').post((req,res)=>{
    console.log("body is "+JSON.stringify(req.body));
    const name=req.body.name;
    console.log('node handling insertion of user with name: '+name);
    const mobileNumber=req.body.mobileNumber;
    const emailAddress=req.body.emailAddress;
    const password=req.body.password;
    let user=new User({
        name:name,
        mobileNumber:mobileNumber,
        emailAddress:emailAddress,
        password:password
    });
    user.save()
    .then(user=>{
        res.status(200).json({"user":" Added successfully"});
    })
    .catch(err=>{
        // console.log(err);
        res.status(400).send(err);
    });
});

router.route('/addresses').get((req,res)=>{
    console.log("viewing list of addresses in json format");
    Address.find((err,addresses)=>{
        if(err)
            console.log(err);
        else
            {
                res.json(addresses);
                res.end();
            }
    });
});

router.route('/addresses/:id').get((req,res)=>{
    Address.findById(req.params.id,(err,address)=>{
        if(err)
            console.log(err);
        else
            {
                console.log("address found was "+address.phoneNumber+" and "+address.city);
                res.json(address);
                res.end();
            }
    });
});

router.route('/addresses/add').post((req,res)=>{
    console.log("body is "+JSON.stringify(req.body));
    const curAddress=req.body.address;
    console.log('node handling insertion of address with address: '+curAddress);
    const city=req.body.city;
    const state=req.body.state;
    const pin_code=req.body.pin_code;
    const phoneNumber=req.body.phoneNumber;
    const userInfo=req.body.userInfo;
    let address=new Address({
        address:curAddress,
        city:city,
        state:state,
        pin_code:pin_code,
        phoneNumber:phoneNumber,
        userInfo:userInfo
    });
    address.save()
    .then(address=>{
        res.status(200).json({"address":" Added successfully"});
    })
    .catch(err=>{
        // console.log(err);
        res.status(400).send(err);
    });
});

router.route('/addresses/update/:id').post((req,res)=>{
    Address.findById(req.params.id,(err,address)=>{
        if(!address)
            return next(new Error(' Could not load address successfully'));
        else{
            address.address=req.body.address;
            address.city=req.body.city;
            address.pin_code=req.body.pin_code;
            address.state=req.body.state;
            address.phoneNumber=req.body.phoneNumber;
            address.userInfo=address.userInfo;
            console.log("updating number: "+req.body.phoneNumber);
            address.save()
            .then(address=>{
                res.json('Update Done');
            })
            .catch(err=>{
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/addresses/delete/:id').get((req,res)=>{
    Address.findByIdAndRemove(req.params.id,(err,address)=>{
        if(err)
            res.json(err);
        else
            res.json("removed successfully");
    });
});

router.route('/cards/:cardNumber').get((req,res)=>{
    let cardToSearchFor=req.params.cardNumber;
    console.log("backend handling cardNumber: "+cardToSearchFor);
    Card.find({cardNumber:cardToSearchFor})
    .then((card)=>
        // ,(err,user)=>{
        // if(!err)
            {
                console.log(" found another card with same Card Number , card: "+card[0].expiryDate);
                res.json({card:"found"});
                res.end();
            }
    )
    .catch((err)=>
        // else
            {
                res.json({card:"not found"});
                res.end();
            }
        );
    // });
});

router.route('/cards').get((req,res)=>{
    console.log("viewing list of cards in json format");
    Card.find((err,cards)=>{
        if(err)
            console.log(err);
        else
            {
                res.json(cards);
                res.end();
            }
    });
});

router.route('/cards/:id').get((req,res)=>{
    Card.findById(req.params.id,(err,card)=>{
        if(err)
            console.log(err);
        else
            {
                console.log("card found was "+card.cardNumber+" and "+card.expiryDate);
                res.json(card);
                res.end();
            }
    });
});

router.route('/cards/add').post((req,res)=>{
    console.log("body is "+JSON.stringify(req.body));
    const cardNumber=req.body.cardNumber;
    console.log('node handling insertion of card with number: '+cardNumber);
    const expiryDate=req.body.expiryDate;
    const nameOnCard=req.body.nameOnCard;
    let card=new Card({
        cardNumber:cardNumber,
        expiryDate:expiryDate,
        nameOnCard:nameOnCard
    });
    card.save()
    .then(card=>{
        res.status(200).json({"card":" Added successfully"});
    })
    .catch(err=>{
        // console.log(err);
        res.status(400).send(err);
    });
});

router.route('/cards/update/:id').post((req,res)=>{
    Card.findById(req.params.id,(err,card)=>{
        if(!card)
            return next(new Error(' Could not load cards successfully'));
        else{
            card.cardNumber=req.body.cardNumber;
            card.expiryDate=req.body.expiryDate;
            card.nameOnCard=card.nameOnCard;
            card.save()
            .then(card=>{
                res.json('Update Done');
            })
            .catch(err=>{
                res.status(400).send('Update failed');
            });
        }
    });
});

router.route('/cards/delete/:id').get((req,res)=>{
    Card.findByIdAndRemove(req.params.id,(err,card)=>{
        if(err)
            res.json(err);
        else
            res.json("removed successfully");
    });
});

app.listen(4000,()=>{console.log("accessing from node");});