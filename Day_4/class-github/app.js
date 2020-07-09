const usernameInputElement = document.getElementById("username");

usernameInputElement.addEventListener("keyup", (e) => {
  console.log('Key up!', e);

  const username = e.target.value;
  // console.log(username);

  const baseUrl = "https://api.github.com/users/" + username;
  // console.log(baseUrl);

  fetch(baseUrl)
    .then((response) => {
      response.json().then((userData) => {
        console.log("Yeeaaaahh Boooiii!!!", userData);
        console.log("User Location: ", userData.location);
        console.log("Number of followers: ", userData.followers);
        document.getElementById('profile').innerText = userData.location;
        const profileElement = document.getElementById("profile");
        profileElement.innerHTML = `
      <div class="badge badge-primary">${userData.location}</div>
      <div class="thisOne">Number of followers: ${userData.followers}</div>
      `;
      });
    })
    .catch((err) => {
      console.log("Ahh phuck... ", err);
    });

  // console.log('This will happen first');
  e.preventDefault();
});