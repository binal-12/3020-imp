// Script for the search page
var hidden = false;

function filterHide(){
    if (!hidden) {
        document.getElementById("filter-price-container").style.display = "none";
        document.getElementById("filter-country").style.display = "none";
        document.getElementById("filter-dietary-container").style.display = "none";
        document.getElementById("filter-menu").style.width = "120px"; 
        document.getElementById("filter-menu").style.transform = "rotate(90deg)"; 
        document.getElementById("filter-menu").style.transformOrigin = "0% 100%"; 
        document.getElementById("filter-menu").style.translate = "0px -50px";  
        document.getElementById("filter-menu").style.alignItems = "flex-start";  
        document.getElementById("filter-header").style.flexDirection = "row-reverse"; 
        var temp = document.getElementsByClassName("search-container");
        for (let i = 0; i < temp.length; i++) {
            temp[i].style.gridTemplateColumns = "50px 1fr";
        }
        document.getElementById("filter-collapse").innerHTML = "&uarr;";
        hidden = true;
    } else {
        document.getElementById("filter-price-container").style.display = "";
        document.getElementById("filter-country").style.display = "";
        document.getElementById("filter-dietary-container").style.display = "";
        document.getElementById("filter-menu").style.width = ""; 
        document.getElementById("filter-menu").style.transform = ""; 
        document.getElementById("filter-menu").style.transformOrigin = ""; 
        document.getElementById("filter-menu").style.translate = "";  
        document.getElementById("filter-menu").style.alignItems = "";  
        document.getElementById("filter-header").style.flexDirection = "";
        var temp = document.getElementsByClassName("search-container");
        for (let i = 0; i < temp.length; i++) {
            temp[i].style.gridTemplateColumns = "275px 1fr";
        }
        document.getElementById("filter-collapse").innerHTML = "&larr;";
        hidden = false;
    }
}