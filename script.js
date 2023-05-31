let resultsContainer = document.getElementsByClassName("container")[0];

const inputEl = document.getElementById("input");

const validateInput = (el) => {
  if (el.target.value === "") {
    resultsContainer.innerHTML =
      "<p>Type something in the above search input</p>";
  } else {
    generateResults(el.target.value, el);
  }
};

inputEl.addEventListener("keyup", depounce(validateInput));

function depounce(fn) {
  let timer;
  console.log("depounce ext");
  return function (...args) {
    if (timer) {
      console.log("clearing");
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, 1000);
  };
}

const generateResults = (searchValue, inputField) => {
  fetch(
    "https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=" +
      searchValue
  )
    .then((response) => response.json())
    .then((data) => {
      let results = data.query.search;
      let numberOfResults = data.query.search.length;
      resultsContainer.innerHTML = "";
      for (let i = 0; i < numberOfResults; i++) {
        let result = document.createElement("div");
        result.classList.add("results");
        result.innerHTML = `
            <div>
                <h3>${results[i].title}</h3>
                <p>${results[i].snippet}</p>
            </div>
            <a href="https://en.wikipedia.org/?curid=${results[i].pageid}" target="_blank">Read More</a>
            `;
        resultsContainer.appendChild(result);
      }
      if (inputField.value === "") {
        resultsContainer.innerHTML =
          "<p>Type something in the above search input</p>";
      }
    });
};
