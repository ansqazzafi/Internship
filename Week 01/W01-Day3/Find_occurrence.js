function track_Occurrence_of_Characters(str){
    let characters ={}
    const newstr = [...str]
    console.log("NewStr", newstr);
    
    newstr.map((char)=>{
       if(characters.hasOwnProperty(char)){
        characters[char]++
       }
       else{
        characters[char] = 1
       }
    })
    return characters
}

const result = track_Occurrence_of_Characters('aliyaar')

Object.entries(result).map(([char, count]) => {
    console.log(`Character: ${char}, Occurrence: ${count}`);
});

