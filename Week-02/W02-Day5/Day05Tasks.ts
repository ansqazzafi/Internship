interface Address {
    Country: string,
    City: string,
    Location: string
    Street: string,
}
interface UserInfo {
    Name: string,
    Age: number,
    Address: Address
}
//Refactor normal Function to Arrow
const getUserInfo = (user: UserInfo):string => {
    //Destructuring
    const { Name, Age, Address } = user
    const { Country, City, Location, Street } = Address;
    //Template literal to format output
    return `${Name}, ${Age}, ${Street}, ${Location}, ${City}, ${Country}`;

}


const data: UserInfo = {
    Name: "Ans",
    Age: 22,
    Address: {
        Country: "Pakistan",
        City: "Gujranwala",
        Location: "People's Colony",
        Street: "Street 06"
    }
};


const updatedData:UserInfo={
    //Spread Operator
    ...data,
    Age:23
}

console.log("Previous Data : " , getUserInfo(data));
console.log("Updated Data : " , getUserInfo(updatedData));
