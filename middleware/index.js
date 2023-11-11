const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const FormData = require('form-data');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended:true}));


function test(){
    // axios.get('https://vision.foodvisor.io/api/1.0/en/food/list',{
    //     headers: {
    //         'Authorization': 'Api-Key L49xZqGL.hLM1CxkTdNhhdZJILaCC0pnh29sFQTAF',
    //     }
    // }).then((d)=>{
    //     console.log(d);
    // }).catch((e)=>{
    //     console.log(e);
    // })

    const form = new FormData();
    form.append('image', fs.readFileSync('C://Users//Daves//Downloads//istockphoto-1457889029-612x612.jpg'), 'C://Users//Daves//Downloads//istockphoto-1457889029-612x612.jpg');

    // axios.post(
    // 'https://vision.foodvisor.io/api/1.0/en/analysis',
    // form,
    // {
    //     headers: {
    //     'accept': 'application/json',
    //     'Content-Type':'multipart/form-data',
    //     'Authorization': 'Api-Key L49xZqGL.hLM1CxkTdNhhdZJILaCC0pnh29sFQTAF'
    //     }
    // }
    // ).then((d)=>{
    //     console.log(d)
    // }).catch((e)=>{
    //     console.log(e);
    // })

    const options = {
        method: 'POST',
        url: 'https://vision.foodvisor.io/api/1.0/en/analysis/',
        headers: {
            'accept': 'application/json',
            'Content-Type':'multipart/form-data',
            'Authorization': 'Api-Key L49xZqGL.hLM1CxkTdNhhdZJILaCC0pnh29sFQTAF',
        },
        form
    }
    axios.request(options).then((d)=>{console.log(d)}).catch((e)=>{console.log(e)});
}

test();