const express=require('express');
const connection=require('../databaseconnection/connection')
const request =require('..');
const router = express.Router();
const jwt =require('jsonwebtoken')
const crypto =require('crypto')
const tokentest=require('../verifytoken/verify')

router.put('/create',(req,res,next)=>{
    let product=req.body;
    let query=" INSERT into products (name,description,price)VALUES(?,?,?)"
    connection.query(query,[product.name,product.description,product.price],(err,result)=>{
        if(!err){
            return res.status(200).json({
                message:'product add sucessfully'
            })
        }else{
            return res.status(500).json({
                message:'internal server error '
            })
        }
    })
})

router.get('/view',tokentest,(req,res,next)=>{
    let product=req.body;
    let query="select * from products"
    connection.query(query,(err,result)=>{
        if(!err){
          
            return res.status(200).json(result)
        }
        else{
            return res.status(500).json({error:err.message})
        }
    })
})

router.patch('/update/:id', (req, res, next) => {
    const id = req.params.id;
    const product = req.body; // Fix: Use req.body to access the request body

    const query = "UPDATE products SET name = ?, description = ?, price = ? WHERE id = ?";
    
    connection.query(query, [product.name, product.description, product.price, id], (err, results) => {
        if (!err) {
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "ID not found"
                });
            }

            return res.status(200).json({
                message: "Successfully updated"
            });
        } else {
            return res.status(500).json(err);
        }
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    const id = req.params.id
    const query="delete from products where id =?"
    connection.query(query,[id],(err,result)=>{
        if(!err){
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "ID not found"
                });
            }

            return res.status(200).json({
                message: "Successfully delete"
            });

        } else {
            return res.status(500).json(err);}
    })
} )

// login user
router.post('/login',(req,res,next)=>{
    const username=req.body.username
    const password=req.body.password
    const hashpassword=crypto.createHash('sha1').update(password).digest('hex')
    const qr="select name from user_table where username=? and password=?"
    connection.query(qr,[username,hashpassword],(err,result)=>{
        
        if(!err && result.length>0){
            const user = result[0]
            const token = jwt.sign({id:user.id,name:user.name},'keyjenerate',{expiresIn:'1h'})

            return res.status(200).json({
                message:'login complete',
                token:token
            })

        }else{
            return res.status(500).json({
                message:'login failed'
            })
        }
    })

})

// login  user end 
module.exports=router