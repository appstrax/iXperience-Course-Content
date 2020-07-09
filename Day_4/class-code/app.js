const usernameInputElement = document.getElementById("username");
console.log(usernameInputElement);

usernameInputElement.addEventListener("keyup", async (e) => {
  e.preventDefault();
  console.log("Key up!", e);

  const username = e.target.value;
  console.log(username);

  const baseUrl = "https://api.github.com/users/" + username;
  console.log(baseUrl);

    // fetch(baseUrl)
    //   .then(function (response) {
    //     response
    //       .json()
    //       .then((userData) => {
    //         console.log("User Location: ", userData.location);
    //       })
    //       .catch((err) => {
    //         console.log("Aww...", err);
    //       });
    //   })
    //   .catch((err) => {
    //     console.log("Aww...", err);
    //   });

  try {
    const response = await fetch(baseUrl);
    const userData = await response.json();
    console.log("User Location: ", userData.location);

    const profileElement = document.getElementById("profile");
    profileElement.innerHTML = `
      <div>${userData.location}</div>
    `;
  } catch (err) {
    console.log("Aww...", err);
  }
});
