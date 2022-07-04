const loginEndPoint = "http://192.168.1.12:3000/login";
const emailInputBox = document.getElementById("e-mail"); 
const pwdInputBox = document.getElementById("pwd");
const button = document.getElementById ("log");

button.addEventListener ("click" , () => {

    const fetchedData = {
        username : emailInputBox.value ,
        password : pwdInputBox.value
    }

    fetchConnection(fetchedData);
});


async function fetchConnection(fetchedData) {


    try {
        const responceObject = await fetch (loginEndPoint , {method : "POST" ,
        headers : { "Content-Type" : "application/json"},
        body: JSON.stringify(fetchedData) });

        const token = await responceObject.json();
        localStorage.setItem ("token" , token.token );
        // Redirect the user to the home page 
        const newUrl = responceObject.headers.get("location");
        console.log(newUrl);
        
        location.assign(newUrl) ;
    }
    catch(error) {
        console.log(error);
        alert (error);
    }
}
