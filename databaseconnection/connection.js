const mysql =require('mysql');
var connection =mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root123',
    database:'curd_db'
})

connection.connect((err)=>{
    if (!err){
        console.log('connection correct')
    }
    else{
        console.error(err)
    }
})

module.exports=connection