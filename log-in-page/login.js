const loginEndPoint = "http://192.168.1.12:3000/login";
const getInfo = "http://192.168.1.12:3000/home";
const emailInputBox = document.getElementById("e-mail"); 
const pwdInputBox = document.getElementById("pwd");
const button = document.getElementById ("log");

button.addEventListener ("click" , () => {

    const fetchedData = {
        username : emailInputBox.value ,
        password : pwdInputBox.value
    }

    fetchConnection(fetchedData)
    .then( ()=> {
        // a normal get request to the end point home 
        // home end point should return the info of this user using token 
        // token is stored in the local sotrge 
        const info =  fetch ( getInfo , {method : "GET" , 
        headers : {"Content-Type" : "application/json" , "authorization" : `Bearer ${localStorage.getItem("token")}`} ,
        });    
        return userInfo ;
    })
    .then ( ( userInfo ) =>{
       return userInfo.json ();
    }).then ( (userInfo)=>{
        //Whatever you want 
        console.log (userInfo.username);
    })
    .catch( (error)=>{
        console.log (error);
    })
});


async function fetchConnection(fetchedData) {


    try {
        const resData = await fetch (loginEndPoint , {method : "POST" ,
        headers : { "Content-Type" : "application/json"},
        body: JSON.stringify(fetchedData) });
        // RESPONSE OBJECT SHOULD be the token    
        const token = await resData.json();
        console.log(token);
        localStorage.setItem("token" , token.token);
    }
    catch(error) {
        console.log(error);
    }
}
