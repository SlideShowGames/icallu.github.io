// UTIL METHODS

function endsWith(str, suffix) {
    if(str==null) return false;
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}


// When document has loaded, initialise
document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        initBottomTabMenu()
        initWindowControls();

        // Variables
        var colorButton = $(".tab");

        colorButton.on("click", function () {

            // Remove class from currently active button
            $(".tab").removeClass("active-tab");

            // Add class active to clicked button
            $(this).addClass("active-tab");

            // Get background color of clicked
            //var newColor = $(this).attr("data-color");

            // Change background of everything with class .bg-color
            //$(".bg-color").css("background-color", newColor);

            // Change color of everything with class .text-color
            //$(".text-color").css("color", newColor);
        });
    }
};

function initBottomTabMenu() {
    const body = document.body;
    const tabs = body.querySelector("tabs")
    const tabSelectors = body.querySelectorAll("tab-select");
    let activeItem = body.querySelector(".active");

    function clickItem(item, index) {

        if (activeItem == item) return;
        if (activeItem) {
            activeItem.classList.remove("active");
        }

        item.classList.add("active");
        // Make content element visible
        for (let i = 0; i < tabs.childElementCount; i++) {
            const element = tabs.childNodes[i];
            if(i == index) element.style.visibility = "visible"
            else element.style.visibility = "hidden"
        }
        activeItem = item;
    }

    tabSelectors.forEach((item, index) => {
        item.addEventListener("click", () => clickItem(item, index));
    })
}


function initWindowControls() {
    // CHILD-WIN
    var searchSpan = document.querySelector(".form-group>span")
    var textField = $(".form-field")
    textField.on('input', function (event) {
        searchUrl = event.target.value;
    })
    textField.on('keyup', function (e) {
        console.log("Pressed key!")
        if (e.key === 'Enter' || e.keyCode === 13) {
            console.log("Pressed enter! -> "+searchUrl)
            if(!searchUrl.includes("/")) searchUrl = window.electron.searchEngineURL+"/"+searchUrl
            let winIndex = 0;
            if (searchUrl != null) {
                winIndex = window.electron.childWinOpen(searchUrl) // Requires url
                searchUrl = null
            }
            else {
                winIndex = window.electron.childWinOpen(window.electron.searchEngineURL) // Requires url
            }
        }
    });
}

function showSearchHintOverlay(searchInputText) {
    let overlay = document.getElementsByClassName("leaderboard__profiles")[0]
    overlay.style.visibility = "visible"
    overlay.replaceChildren()
    // TODO: for each 
    // get favicon, name/url
    overlay.insertAdjacentHTML('beforeend', `<article class="leaderboard__profile">
      <img src="https://randomuser.me/api/portraits/men/37.jpg" alt="Evan Spiegel" class="leaderboard__picture">
      <span class="leaderboard__name">Evan Spiegel</span>
      <span class="leaderboard__value">2.1<span>B</span></span>
    </article>`);
}