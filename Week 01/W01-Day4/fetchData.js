const getDate = (continent , capital)=>{
    return new Promise((resolve , reject)=>{
        fetch (`http://worldtimeapi.org/api/timezone/${continent}/${capital}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then((data)=>{
            resolve({
                continent , 
                capital , 
                data
            })
        })
        .catch((err)=>{
            reject(err)
        })
    })
}


getDate('Europe' , 'Rome')
.then((result)=>{
    const date = new Date(result.data.datetime);
    const formattedDate = date.toISOString().split('T')[0];
    console.log("Continent :" , result.continent);
    console.log("Captial :" , result.capital);
    console.log("Date :" , formattedDate);
})
.catch((error)=>{
    console.log(error);
})
