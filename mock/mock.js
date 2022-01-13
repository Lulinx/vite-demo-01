const mockData = {
    "shop.getShopList":{
        code:"0",
        message:"请求成功",
        shopList:[
            {
                id:'001',
                price:10000,
                number:311,
                name:"风衣",
                goodUrl:"https://assets.burberry.com/is/image/Burberryltd/488D5794-C6D0-4954-8E7C-30E2AD167B4B.jpg?$BBY_V2_ML_1x1$&wid=887&hei=887"
            },{
                id:'002',
                price:20000,
                number:11,
                name:"风衣",
                goodUrl:"https://assets.burberry.com/is/image/Burberryltd/488D5794-C6D0-4954-8E7C-30E2AD167B4B.jpg?$BBY_V2_ML_1x1$&wid=887&hei=887"
            },{
                id:'003',
                price:103400,
                number:0,
                name:"风衣",
                goodUrl:"https://assets.burberry.com/is/image/Burberryltd/488D5794-C6D0-4954-8E7C-30E2AD167B4B.jpg?$BBY_V2_ML_1x1$&wid=887&hei=887"
            },{
                id:'004',
                price:100,
                number:66,
                name:"风衣",
                goodUrl:"https://assets.burberry.com/is/image/Burberryltd/488D5794-C6D0-4954-8E7C-30E2AD167B4B.jpg?$BBY_V2_ML_1x1$&wid=887&hei=887"
            },{
                id:'005',
                price:4320,
                number:32,
                name:"风衣",
                goodUrl:"https://assets.burberry.com/is/image/Burberryltd/488D5794-C6D0-4954-8E7C-30E2AD167B4B.jpg?$BBY_V2_ML_1x1$&wid=887&hei=887"
            }
        ]
    }
}

export default  (key)=>{
    return new Promise(res=>{
        setTimeout(()=>{
            res(mockData[key])
        },1000);
    })
}