var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
//Refactor normal Function to Arrow
var getUserInfo = function (user) {
    //Destructuring
    var Name = user.Name, Age = user.Age, Address = user.Address;
    var Country = Address.Country, City = Address.City, Location = Address.Location, Street = Address.Street;
    //Template literal to format output
    return "".concat(Name, ", ").concat(Age, ", ").concat(Street, ", ").concat(Location, ", ").concat(City, ", ").concat(Country);
};
var data = {
    Name: "Ans",
    Age: 22,
    Address: {
        Country: "Pakistan",
        City: "Gujranwala",
        Location: "People's Colony",
        Street: "Street 06"
    }
};
var updatedData = __assign(__assign({}, data), { Age: 23 });
console.log("Previous Data : ", getUserInfo(data));
console.log("Updated Data : ", getUserInfo(updatedData));
