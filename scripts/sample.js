/* This is a very rough sample script for inserting new products
    into a row on the home page.

    You'll need to run this command on the command line before
    opening Chrome in order for the data to be retrieved properly,
    or else it will be blocked by CORS policy
    (if Chrome is installed elsewhere, then replace the filepath):
    "C:\Program Files\Google\Chrome\Application\chrome.exe" --allow-file-access-from-files
*/

const homeProductsTitle = document.getElementById("home-products-title");

// Fetch data from JSON file
let getProducts = async function() {
    return fetch("./data/sample.json")
        .then(response => response.json())
        .then(json => json);
}
const products = await getProducts();

// Create new row
const newRow = document.createElement("div");
newRow.setAttribute("id", "row-1");

// Create new item group for each product fetched
for (const product of products) {
    const newGroup = document.createElement("div");
    newGroup.setAttribute("id", "group-1");

    const newLink = document.createElement("a");
    newLink.setAttribute("id", "link-1");
    newLink.setAttribute("href", "./pages/product.html");

    const newImg = document.createElement("img");
    newImg.setAttribute("id", "img-1");
    newImg.setAttribute("src", `./assets/${product.imageName}`);

    // Add img inside link, link inside div, and div inside row
    newLink.appendChild(newImg);
    newGroup.appendChild(newLink);
    newRow.appendChild(newGroup);
}

// Add new row after the "Products" text
homeProductsTitle.after(newRow);
