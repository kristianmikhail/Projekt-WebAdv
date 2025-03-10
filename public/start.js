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

            // Step 2: Select body and create a <ul> element
            let body = document.body;
            let ul = document.createElement("ul");
            ul.classList.add("stores"); // Add a class for styling

            // Step 3: Loop over the stores array and create <li> for each store
            data.forEach(store => {
                let li = document.createElement("li");

                // Store name (Editable)
                let storeName = document.createElement("input");
                storeName.type = "text";
                storeName.value = store.store_name;

                // Store district (Editable)
                let district = document.createElement("input");
                district.type = "text";
                district.value = store.district;

                // Store link (Editable)
                let storeLink = document.createElement("input");
                storeLink.type = "text";
                storeLink.value = store.url;

                // Ensure the URL starts with "http://" or "https://"
                let storeURL = store.url;
                if (storeURL && !storeURL.startsWith("http://") && !storeURL.startsWith("https://")) {
                    storeURL = "https://" + storeURL;
                }

                let storeLinkAnchor = document.createElement("a");
                storeLinkAnchor.href = storeURL || "#"; // Use "#" if no URL is available
                storeLinkAnchor.innerText = "Visit Website";
                storeLinkAnchor.target = "_blank"; // Open in new tab

                // Save Button (for updates)
                let saveButton = document.createElement("button");
                saveButton.innerText = "Save";
                saveButton.onclick = () => updateStore(store.id, storeName.value, storeLink.value, district.value);

                // Delete Button
                let deleteButton = document.createElement("button");
                deleteButton.innerText = "Delete";
                deleteButton.onclick = () => deleteStore(store.id);

                // Append elements to <li>
                li.appendChild(storeName);
                li.appendChild(district);
                li.appendChild(storeLink);
                li.appendChild(document.createElement("br"));
                li.appendChild(storeLinkAnchor);
                li.appendChild(saveButton);
                li.appendChild(deleteButton);

                // Append <li> to <ul>
                ul.appendChild(li);
            });

            // Step 4: Append the <ul> to the body
            document.querySelector(".stores")?.remove(); // Remove existing <ul> if present
            body.appendChild(ul);
        })
        .catch(error => {
            console.error('Error fetching store data:', error);
        });
}

// Sorting buttons
document.getElementById("sort-name").addEventListener("click", () => fetchStores("name"));
document.getElementById("sort-district").addEventListener("click", () => fetchStores("district"));

// Function to Update Store
function updateStore(id, name, url, district) {
    fetch(`http://localhost:3000/store/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, url, district })
    })
    .then(response => response.json())
    .then(() => fetchStores()) // Refresh the list after update
    .catch(error => console.error("Error updating store:", error));
}

// Function to Delete Store
function deleteStore(id) {
    fetch(`http://localhost:3000/store/${id}`, { method: "DELETE" })
        .then(() => fetchStores()) // Refresh the list after deletion
        .catch(error => console.error("Error deleting store:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    fetchStores();
});

// 





// // Fetch stores from the backend
// fetch('http://localhost:3000/all')
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not OK');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log('Stores fetched:', data);

//         // Step 2: Select body and create a <ul> element
//         let body = document.body;
//         let ul = document.createElement("ul");
//         ul.classList.add("stores"); // Add a class for styling

//         // Step 3: Loop over the stores array and create <li> for each store
//         data.forEach(store => {
//             let li = document.createElement("li");

//             // Store name (Editable)
//             let storeName = document.createElement("input");
//             storeName.type = "text";
//             storeName.value = store.store_name;

//             // Store district (Editable)
//             let district = document.createElement("input");
//             district.type = "text";
//             district.value = store.district;

//             // Store link (Editable)
//             let storeLink = document.createElement("input");
//             storeLink.type = "text";
//             storeLink.value = store.url;

//             // Ensure the URL starts with "http://" or "https://"
//             let storeURL = store.url;
//             if (storeURL && !storeURL.startsWith("http://") && !storeURL.startsWith("https://")) {
//                 storeURL = "https://" + storeURL;
//             }

//             let storeLinkAnchor = document.createElement("a");
//             storeLinkAnchor.href = storeURL || "#"; // Use "#" if no URL is available
//             storeLinkAnchor.innerText = "Visit Website";
//             storeLinkAnchor.target = "_blank"; // Open in new tab

//             // Save Button (for updates)
//             let saveButton = document.createElement("button");
//             saveButton.innerText = "Save";
//             saveButton.onclick = () => updateStore(store.id, storeName.value, storeLink.value, district.value);

//             // Delete Button
//             let deleteButton = document.createElement("button");
//             deleteButton.innerText = "Delete";
//             deleteButton.onclick = () => deleteStore(store.id);

//             // Append elements to <li>
//             li.appendChild(storeName);
//             li.appendChild(district);
//             li.appendChild(storeLink);
//             li.appendChild(document.createElement("br"));
//             li.appendChild(storeLinkAnchor);
//             li.appendChild(saveButton);
//             li.appendChild(deleteButton);

//             // Append <li> to <ul>
//             ul.appendChild(li);
//         });

//         // Step 4: Append the <ul> to the body
//         document.querySelector(".stores")?.remove(); // Remove existing <ul> if present
//         body.appendChild(ul);
//     })
//     .catch(error => {
//         console.error('Error fetching store data:', error);
//     });

// // Function to Update Store
// function updateStore(id, name, url, district) {
//     fetch(`http://localhost:3000/store/${id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name, url, district })
//     })
//     .then(response => response.json())
//     .then(() => location.reload()) // Refresh the page after update
//     .catch(error => console.error("Error updating store:", error));
// }

// // Function to Delete Store
// function deleteStore(id) {
//     fetch(`http://localhost:3000/store/${id}`, { method: "DELETE" })
//         .then(() => location.reload()) // Refresh the page after deletion
//         .catch(error => console.error("Error deleting store:", error));
// }
