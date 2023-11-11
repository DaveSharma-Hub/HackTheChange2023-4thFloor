import axios from 'axios';


async function getFoodVisorData(){
    const options = {
        method: 'POST',
        url: 'https://vision.foodvisor.io/api/1.0/en',
        headers: {
            'Authorization': 'Api-Key L49xZqGL.hLM1CxkTdNhhdZJILaCC0pnh29sFQTAF',
        },
        data:{
            'image':'https://images.rawpixel.com/image_png_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcGYtczg3LW1uLTI1LTAxLnBuZw.png'
        }
    };

    try{
        return await axios.request(options);
    }catch(e){
        console.log(e);
    }

}

async function getFoodPrint(){
    const options = {
        method: 'GET',
        url: 'https://foodprint.p.rapidapi.com/api/foodprint/name/curry',
        headers: {
            'X-RapidAPI-Key': '43568b5614msh0a3cf45f74913b5p141c47jsn58c99c0ad788',
            'X-RapidAPI-Host': 'foodprint.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        return response;
    } catch (error) {
        console.error(error);
    }
}

export {
    getFoodVisorData,
    getFoodPrint
}