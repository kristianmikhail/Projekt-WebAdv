// Function to fetch stores from the backend
function fetchStores(sortBy = "") {
    let url = "http://localhost:3000/all";
    if (sortBy) {
        url += `?sort=${sortBy}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not OK');
            }
            return response.json();
        })
        .then(data => {
            console.log('Stores fetched:', data);

            let body = document.body;
            let ul = document.createElement("ul");
            ul.classList.add("stores"); 

            data.forEach(store => {
                let li = document.createElement("li");
                
                let storeName = document.createElement("input");
                storeName.type = "text";
                storeName.value = store.store_name;

                let district = document.createElement("input");
                district.type = "text";
                district.value = store.district;

                let storeLink = document.createElement("input");
                storeLink.type = "text";
                storeLink.value = store.url;

                let storeURL = store.url;
                if (storeURL && !storeURL.startsWith("http://") && !storeURL.startsWith("https://")) {
                    storeURL = "https://" + storeURL;
                }

                let storeLinkAnchor = document.createElement("a");
                storeLinkAnchor.href = storeURL || "#";
                storeLinkAnchor.innerText = "Visit Website";
                storeLinkAnchor.target = "_blank";

                let saveButton = document.createElement("button");
                saveButton.innerText = "Save";
                saveButton.onclick = () => updateStore(store.id, storeName.value, storeLink.value, district.value);

                let deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.onclick = () => deleteStore(store.id);

                li.appendChild(storeName);
                li.appendChild(district);
                li.appendChild(storeLink);
                li.appendChild(document.createElement("br"));
                li.appendChild(storeLinkAnchor);
                li.appendChild(saveButton);
                li.appendChild(deleteButton);

                ul.appendChild(li);
            });

            document.querySelector(".stores")?.remove(); 
            body.appendChild(ul);
        })
        .catch(error => {
            console.error('Error fetching store data:', error);
        });
}

// Sorting buttons
document.getElementById("sort-name").addEventListener("click", () => fetchStores("name"));
document.getElementById("sort-district").addEventListener("click", () => fetchStores("district"));

// Function to Add Store
function addStore(event) {
    event.preventDefault();

    let name = document.getElementById("store-name").value;
    let district = document.getElementById("store-district").value;
    let url = document.getElementById("store-url").value;

    fetch("http://localhost:3000/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, district, url })
    })
    .then(response => response.json())
    .then(() => {
        fetchStores();
        document.getElementById("store-form").reset();
    })
    .catch(error => console.error("Error adding store:", error));
}

// Function to Update Store
function updateStore(id, name, url, district) {
    fetch(`http://localhost:3000/store/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url, district })
    })
    .then(response => response.json())
    .then(() => fetchStores())
    .catch(error => console.error("Error updating store:", error));
}

// Function to Delete Store
function deleteStore(id) {
    fetch(`http://localhost:3000/store/${id}`, { method: "DELETE" })
        .then(() => fetchStores())
        .catch(error => console.error("Error deleting store:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    fetchStores();

    let form = document.createElement("form");
    form.id = "store-form";

    let nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.id = "store-name";
    nameInput.placeholder = "Store Name";

    let districtInput = document.createElement("input");
    districtInput.type = "text";
    districtInput.id = "store-district";
    districtInput.placeholder = "District";

    let urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.id = "store-url";
    urlInput.placeholder = "Store URL";

    let submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.innerText = "Add Store";

    form.appendChild(nameInput);
    form.appendChild(districtInput);
    form.appendChild(urlInput);
    form.appendChild(submitButton);

    form.addEventListener("submit", addStore);

    document.body.prepend(form);
});
