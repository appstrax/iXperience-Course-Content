function getData(cb) {
  // Do an operation that takes time
  const data = { title: "1" };
  cb(data);
}

getData(function (data) {
  console.log(data.title);
  getData(() => {
    console.log(data.title);
  });
});

const p = new Promise((resolve, reject) => {
  if (1 + 1 === 3) {
    resolve();
  } else {
    reject(new Error("Something went wrong"));
  }
});

p.then(() => {
  console.log("Promise resolved!");
}).catch(() => {
  console.log("Promise rejected!");
});

async function longRunningOperation() {
  try {
    const data = await p();
  } catch (err) {
    console.log(err);
  }
}
