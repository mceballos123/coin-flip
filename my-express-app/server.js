const express=require('express');
const app=express();

const port=3000
app.get('/',(request,response)=>{
    response.send('Hello from Dockerized Express APP!!!')
});

app.get('/flip-coin',(request,response)=>{
    const randomNumber=Math.random();
    let coinValue=''
    if(randomNumber < 0.5){
        coinValue='Heads'
    }else{
        coinValue='Tails'
    }

    response.send(coinValue)
})

app.get('/flip-coins',(request, response)=>{
    const times=request.query.times;
    if(times && times > 0){
        let heads=0;
        let tails=0;
        for(let i=0; i< times; i++){
            const randomNumber=Math.random()
            if(randomNumber < 0.5){
                heads++;
            }else{
                tails++;
            }
        
            response.json({ heads, tails})
    
    }

    }else{
        response.send("Hey! You need to send times!!!")
    }

})

app.listen(port,()=>{
    console.log(`Server is running at http://localhost:${port}`)
});
