function ValidateLogin() {
// Storing Field Values In Variables
var name = document.getElementById("username").value;
var passw = document.getElementById("passw").value;
// Conditions
	if (name != '' && passw != '') 
	{
		if (name == "123" && passw == "123") 
		{
			// console.log("Login successfully");
			url = 'data.html'
			document.location.href = url;
			return false;
		} 
		else 
		{
			alert("The username password not match!");
			return false;
		}
	}	
	else 
	{
		alert("All fields are required.....!");
		return false;
	}
}