var allScores = document.querySelector("#allScores");
var reset = document.querySelector(".reset");

// Removes key - "highScores" from local storage
reset.addEventListener("click", function() {
    localStorage.removeItem("highScores");
    location.reload();
})

var storedScores = localStorage.getItem("highScores");
highScores = JSON.parse(storedScores);

function showScores() {
if (highScores !== null) {
    for (var i = 0; i < highScores.length; i++) {
        var newList = document.createElement("li");
        newList.setAttribute("id", "newList");
        newList.textContent = "Initials: " + highScores[i].initials + " | " + "Score:  " + highScores[i].finalScore + "/5";
        allScores.appendChild(newList);

    }

} else {
    allScores.innerHTML = "No Scores to Show";
    
}
}

showScores();

