import axios from 'axios';


async function getFoodVisorData(){
    const options = {
        method: 'POST',
        url: 'https://vision.foodvisor.io/api/1.0/en/analysis/',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Api-Key codethechangefourthfloorapi',
        },
        data:{
            'image':'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtczg3LW1uLTI1LTAxLnBuZw.png'
        }
    };
    const options2 = {
        method: 'GET',
        url: 'https://vision.foodvisor.io/api/1.0/en/food/list',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded',
            'Authorization': 'Api-Key L49xZqGL.hLM1CxkTdNhhdZJILaCC0pnh29sFQTAF',
        }
    };

    try{
        return await axios.request(options2);
    }catch(e){
        console.log(e);
    }

}

async function getFoodPrint(foodItem){
    const options = {
        method: 'GET',
        url: `https://foodprint.p.rapidapi.com/api/foodprint/name/${foodItem}`,
        headers: {
            'X-RapidAPI-Key': '43568b5614msh0a3cf45f74913b5p141c47jsn58c99c0ad788',
            'X-RapidAPI-Host': 'foodprint.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

async function getFoodMLData(imageSrc){
    try{
        const options = {
            method: 'POST',
            url: 'http://localhost:60266/predict',
            headers: {
                'Content-Type':'application/json',
            },
            data:{
                imagePath:imageSrc
            }
        };
        // const res = await axios.request(options);
        const score = [11,19,2.4,491,122];
        const label = ['one','g','dede','fef','jjf'];
        const res = {
            data:[
                {
                    predictedLabel:'monkeys',
                    score:score
                },
                [...label]
            ]
        }
        if(res.data){
            const d1 = res.data[0];
            const d2 = res.data[1];
            const topScores = getTopScores(d1.score, d2);
            return {
                predictedLabel:d1.predictedLabel,
                topScores: topScores
            }
        }
    }catch(e){
        console.log(e);
    }
}

const getTopScores = (scores, array) => {
    const scoreIndexArr = [];
    for(let i=0;i<scores.length;i++){
        scoreIndexArr.push({
            score:scores[i],
            index:i
        });
    }

    const sorted = scoreIndexArr.sort((a,b)=>b.score-a.score);
    const res = [];
    for(let i=0;i<3 && i<sorted.length;i++){
        res.push({
            label:array[sorted[i].index],
            score:sorted[i].score
        });
    }
    return res;
}

export {
    getFoodVisorData,
    getFoodPrint,
    getFoodMLData
}