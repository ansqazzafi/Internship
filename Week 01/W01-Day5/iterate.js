const keyValuePairs = (key , value) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            console.log(`${key} : ${value}`);
            resolve()
        },1000)
    })
}


const displayData = async (obj) =>{
    for(const [key ,value] of Object.entries(obj)){
        await keyValuePairs(key , value)
    }
}

displayData({
    id:1,
    name:"ans",
    department: "CS"
})