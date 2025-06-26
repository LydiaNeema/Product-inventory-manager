const display=document.querySelector('.display');
// API URL for product management
// This URL should point to your backend server where the product data is managed.
// Make sure your backend is running and accessible at this URL.

const APIURL="http://localhost:3000/Products";
// This is the table body where product data will be displayed
const tableBody=document.querySelector('.product-list');

// Function to render the product table
// This function takes an array of products and populates the table body with rows for each product
// Each row contains product details and action buttons for issuing, receiving, editing, and deleting products
function renderTable(products) {
  tableBody.innerHTML = "";

  if (products.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="9" style="text-align:center;">No products found</td></tr>`;
    return;
  }

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.dataset.id = product.id;

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${product.name}</td>
      <td>${product.code}</td>
      <td>${product.category}</td>
      <td>${product.location}</td>
      <td>${product.quantity}</td>
      <td>Ksh:${product.cost}</td>
       <td><button class="issue"  title="Issue/Reduce product quantity"><i class="material-icons">remove_circle</i></button></td>
    <td><button class="receive"title="Receive/Add product quantity"><i class="material-icons">add_circle</i></button></td>
           <td><button class="edit"title="Edit product details"><i class="material-icons">edit</i></button></td>
            <td><button class="delete"title="Delete/remove product"><i class="material-icons">delete</i></button></td>
    `;

    tableBody.appendChild(row);
  });
}
//function to display products
// This function fetches the product data from the API and calls renderTable to display it
function displayProducts(){
    tableBody.innerHTML="";
fetch(APIURL)
.then(response=>response.json())
        .then(products => renderTable(products))
    .catch(error => console.error("Failed to fetch products:", error));
}
        


// function to add the new product functionality
function addNewProduct(){
    const addButton=document.getElementById('addbtn');
    addButton.addEventListener("click",function(e){
        e.preventDefault();
//removing any exsiting form
        const exsitingForm=document.querySelector('.product-form');
        if(exsitingForm){
            exsitingForm.remove();
        }
//creating a new form
    const form=document.createElement('form');
    form.className="product-form";
   
    form.innerHTML=`

                <div class="formClass">

                <label>Product Name</label><input type="text" id="productname" placeholder="Enter product Name">
                <br>
                <label>Code</label><input type="text" id="productCode" placeholder="Auto-generated">
               
                <br>
                <label>Category</label><input type="text" id="productcat" placeholder="Enter product category">
                <br>
                <label>location</label><input type="text" id="productlocation" placeholder="Auto-filled based on category">
               
                <br>
                <label>Quantity</label><input type="text" id="productQuantity" placeholder="Enter product quantity">
                <br>
                <label>Cost</label><input type="text" id="productcost" placeholder="Enter the cost here">

                <br>
                <button class="buttongroup" type="submit" id="submit">Submit</button>
                <button class="buttongroup" type="Cancel" id="Cancel">Cancel</button>
                </div>


                `;

    //appending the form to the middle section  div called form-wrapper
    // This is where the form will be displayed in the HTML structure         
              const formWrapper = document.querySelector('.form-wrapper');
formWrapper.innerHTML = ""; // Clear any existing form
formWrapper.appendChild(form);
                
       
    
//form submission
    form.addEventListener('submit',function(e){
        e.preventDefault();

//get the values from the form inputs
        // Using querySelector to get the input values from the form
        const newName=form.querySelector('#productname').value;//name input field
        const newCodeInput=form.querySelector('#productCode');//code input filed
         const newLocationInput=form.querySelector('#productlocation');//location input field
         const newQuantity=form.querySelector('#productQuantity').value;//quantity input field
        const newCost=form.querySelector('#productcost').value;//cost input field
        const categoryInput = form.querySelector('#productcat');//category input field

        //autogenerating a code for the new product
        const code = "Pr-" + Math.floor(Math.random() * 10000);
        newCodeInput.value=code;
        newCodeInput.readOnly=true;

     
//determinigng the products location based on the selected category
  const selectedCategory = categoryInput.value.toLowerCase();// Convert to lowercase for consistency

 let location="";
// Setting the location based on the selected category
  // Using if-else statements to determine the location based on the selected category
  if (selectedCategory === 'electronics') {
    newLocationInput.value = 'Aisle-C';
  } else if (selectedCategory === 'toiletries') {
    newLocationInput.value = 'Aisle-A';}
    else if (selectedCategory === 'production') {
    location = 'Aisle-B';}
    else if (selectedCategory === 'stationery') {
    location = 'Aisle-D';
  }
  else if (selectedCategory === 'furniture') {
    location = 'Aisle-E';
   } else {
    location="Aisle-F" ;// Or some default
  }

 newLocationInput.value=location;
newLocationInput.readOnly=true;

// Validating the form inputs
// Checking if any of the required fields are empty
if (!newName || !newQuantity || !newCost || !selectedCategory) {
  alert("Please fill in all required fields.");
  return; 
}

// posting the new product data to the API
// Using fetch to send a POST request to the API with the new product data
    fetch(APIURL,{
method:'POST',
headers:{
    'content-type':'application/json'
},
body:JSON.stringify({
    name:newName,
    code:code,
    category:selectedCategory,
    location:location,
    quantity:newQuantity,
    cost:newCost

})
    })
    .then(response=>response.json())
    .then(()=>{
        displayProducts();
        form.remove();
        
    })
    .catch((error)=>console.error('Error adding product',error));
});
//cancel button
 const cancelBtn = form.querySelector('#Cancel');
        cancelBtn.addEventListener('click', () => {
            form.remove();
        });
    });
}

// Function to handle search functionality
// This function adds an event listener to the search button and filters products based on the search input
function searchButton(){
    const searchbtn=document.getElementById('search');
     const clearBtn = document.getElementById('clear');
  const searchInput = document.getElementById('search-input');
    searchbtn.addEventListener('click',function(e){
        e.preventDefault();

        const searchInput=document.getElementById('search-input').value.toLowerCase();
        
if(searchInput==="")return;

        fetch(APIURL)
        .then(response=>response.json())
        .then(products=>{

      const filtered =products.filter(product=>{
        return(
                product.name.toLowerCase().includes(searchInput)||
                 product.code.toLowerCase().includes(searchInput)
            );
        });
       renderTable(filtered);
    });
    
        });
//clear button functionality
        clearBtn.addEventListener('click', function(e) {
    e.preventDefault();
    searchInput.value = "";
    displayProducts(); // show full product list again
  });

  // Auto-restore on empty input
  searchInput.addEventListener('input', function() {
    if (searchInput.value.trim() === "") {
      displayProducts();
    }
});
    }
searchButton();

// Function to handle filtering products by category
// This function adds an event listener to the filter button and filters products based on the selected category
function filterButton(){
    const filterBtn=document.getElementById('filter');
    filterBtn.addEventListener('click',function(e){
        e.preventDefault();
        const selectedCategory=document.getElementById('selectCat').value;

        fetch(APIURL)
        .then(response=>response.json())
        .then((products)=>{
            const selected=products.filter(product=>

                 (product.category||'').toLowerCase().includes(selectedCategory)
            );
            renderTable(selected);
        });
        

            });
       
}
filterButton();

// Function to handle stock requests (issue/receive)
// This function adds event listeners to the issue and receive buttons in the product table
function handleStockRequest(){
    tableBody.addEventListener('click',function(e){
        const row=e.target.closest('tr');
        if(!row)return;
        const id=row.dataset.id;
        const currentQuantity=parseInt(row.children[5].textContent);
// isuance logic
            if(e.target.closest('.issue')){
const amount=parseInt(prompt('Enter quantity to issue'));
if(amount>0&& amount<=currentQuantity){
    const updatedQuantity=currentQuantity-amount;
    updateProductQuantity(id,updatedQuantity);
}
else {
    alert('Invalid amount.Must be greater than 0 and not exceeding avaiable quantity');
}
}
//receiving logic
   if(e.target.closest('.receive')) {
    const amount=parseInt(prompt('Enter quantity to receive:'));
    if(amount>0){
        const updatedQuantity=currentQuantity+amount;
        updateProductQuantity(id,updatedQuantity);
    }
    else{
        alert("invalid amount.Must be a positive number.");
    }
}
    });
}
// Function to update product quantity
// This function sends a PATCH request to the API to update the quantity of a product
// It takes the product ID and the new quantity as parameters
function updateProductQuantity(id,newQuantity){
    fetch(`${APIURL}/${id}`,{
        method:'PATCH',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({quantity:newQuantity})
    })
    .then(response=>response.json())
    .then(()=>displayProducts())
    .catch(error=>console.error('Failed to update Quantity:',error));
      
   }
      
    

// Function to handle editing products
function editButton(){
    
    tableBody.addEventListener('click',function(e){
        if(e.target.closest('.edit')){
            const row=e.target.closest('tr');

const id=row.dataset.id;
const name=row.children[1].textContent;
const code=row.children[2].textContent;
const category=row.children[3].textContent;
const location =row.children[4].textContent;
const quantity =row.children[5].textContent;
const cost =row.children[6].textContent.replace('Ksh:','');

const newName=prompt('Enter product name',name);
const newQuantity=prompt('Enter quantity name',quantity);
const newCost=prompt('Edit cost',cost);
if (newName === null || newQuantity === null || newCost === null) return;



const updatedProduct={
    name:newName||name,
    quantity:newQuantity|| quantity,
    cost:newCost || cost,

};
fetch(`${APIURL}/${id}`,{
    method:'PATCH',
    headers:{
        'content-type':'application/json',
    },
    body:JSON.stringify(updatedProduct),
})
.then((response)=>response.json())
.then(()=>{
    displayProducts();
})
.catch((error)=>console.error('Edit failed:',error));
        }
        
    });
}

// Function to handle deleting products
function deleteButton(){
    tableBody.addEventListener('click',function(e){
        if(e.target.closest('.delete')){
            const row=e.target.closest('tr');
            const id=row.dataset.id;

            const confirmDelete=confirm('Are you sure you want to delete this product?');
            if(!confirmDelete) return;
            fetch(`${APIURL}/${id}`,{
                method:'DELETE',
            })
            .then(()=>{
                displayProducts();
            })
            .catch((error)=>console.error('Delete failed',error))
            }
        
    });
}
// Event listener for DOMContentLoaded to initialize the application
// This ensures that the product list is displayed and all event listeners are set up after the DOM
document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  addNewProduct();
  editButton();
  deleteButton();
  handleStockRequest();
  searchButton();   // <-- Add these here too
  filterButton();
  displayCategories()
});


// Navigation functionality
// This section handles the navigation between different sections of the application
  const sections = {
    dashboard: document.getElementById('dashboard-section'),
    categories: document.getElementById('categories-section'),
  };

  function showSection(selected) {
    for (const key in sections) {
      sections[key].style.display = (key === selected) ? 'block' : 'none';
    }
  }

  document.getElementById('dashboard-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('dashboard');
  });

  document.getElementById('categories-link').addEventListener('click', (e) => {
    e.preventDefault();
    showSection('categories');
  });
  showSection('dashboard');
  
// Category Management
// Initialize categories from localStorage or default values
  let categories = JSON.parse(localStorage.getItem("categories")) || [
  "Electronics",
  "Furniture",
  "Stationery",
  "Toiletries"
];

const categoryForm = document.getElementById("category-form");
const categoryInput = document.getElementById("category-input");
const categoryList = document.getElementById("category-list");

function displayCategories() {
  categoryList.innerHTML = "";

  if (categories.length === 0) {
    categoryList.innerHTML = "<li>No categories found.</li>";
    return;
  }

  categories.forEach((category, index) => {
    const li = document.createElement("li");
    li.textContent = category;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "10px";
    deleteBtn.style.backgroundColor = "red";
    deleteBtn.style.color = "white";
    deleteBtn.style.border = "none";
    deleteBtn.style.borderRadius = "5px";
    deleteBtn.style.padding = "2px 6px";

    deleteBtn.addEventListener("click", () => {
      categories.splice(index, 1);
      localStorage.setItem("categories", JSON.stringify(categories));
      displayCategories();
    });

    li.appendChild(deleteBtn);
    categoryList.appendChild(li);
  });
}

categoryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const newCategory = categoryInput.value.trim();

  if (newCategory && !categories.includes(newCategory)) {
    categories.push(newCategory);
    categoryInput.value = "";
    localStorage.setItem("categories", JSON.stringify(categories));
    displayCategories();
  } else {
    alert("Category already exists or is invalid.");
  }
});
// sign out functionality
  document.getElementById("logoutBtn").addEventListener("click", function (e) {
    e.preventDefault(); // prevent any default link action
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  });
 