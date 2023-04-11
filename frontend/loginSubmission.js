// get references to the input fields and the login button
const usernameField = document.getElementById("email");
const passwordField = document.getElementById("password");
const loginButton = document.getElementById("submitBtn");


function testLol(){
    event.preventDefault(); // prevent the default form submission behavior
    //alert("pressed");
  
    // create an object with the input values
    const formData = {
      username: usernameField.value,
      password: passwordField.value
    };
  
    // send a POST request to the backend with the form data
    fetch('http://localhost:8000/api/users', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // login successful, redirect to the dashboard or homepage
        //window.location.href = '/dashboard';
        alert("noice");
      } else {
        // login failed, display an error message to the user
        alert('Login failed. Please check your credentials and try again.');
      }
    })
    .catch(error => {
      console.error('Error sending login request:', error);
    });
}