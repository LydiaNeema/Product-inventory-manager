const display=document.querySelector('.display');
const tableBody=document.querySelector('.product-list');
const APIURL="http://localhost:3000/Products";

function displayProducts(){
    tableBody.innerHTML="";
fetch(APIURL)
.then(response=>response.json())
    .then(products=>
        {
        products.forEach((product,index)=>{
            const tabledata=document.createElement('tr');
             tabledata.dataset.id = product.id;
            tabledata.innerHTML=`<td>${index + 1}</td><td>${product.name}</td><td>${product.code}</td><td>${product.category}</td><td>${product.location}</td><td>${product.quantity}</td><td>Ksh:${product.cost}</td>
           <td> <button class="edit"><i class="material-icons">edit</i></button></td>
            <td><button class="delete"><i class="material-icons">delete</i></button></td>`;
           
            tableBody.appendChild(tabledata);

        })
    })

}


// function to add the product functionality
function addProduct(){

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

    //appending the form to the middle section           
                const middle=document.querySelector('.middle');
                 middle.appendChild(form);
                
                
       
    
//form submission
    form.addEventListener('submit',function(e){
        e.preventDefault();


        const newName=form.querySelector('#productname').value;
        
        const newCodeInput=form.querySelector('#productCode');
         const newLocationInput=form.querySelector('#productlocation');
         const newQuantity=form.querySelector('#productQuantity').value;
        const newCost=form.querySelector('#productcost').value;
        const categoryInput = form.querySelector('#productcat');

        //autogenerating a code for the new product
        const code = "Pr-" + Math.floor(Math.random() * 10000);
        newCodeInput.value=code;
        newCodeInput.ReadOnly=true;

     
//determinigng the products location based on the selected category
  const selectedCategory = categoryInput.value.toLowerCase();

 let location="";

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

newLocationInput.ReadOnly=true;


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


function searchButton(){
    const searchbtn=document.getElementById('search');
    searchbtn.addEventListener('click',function(e){
        e.preventDefault();

        const searchInput=document.getElementById('search-input').value.toLowerCase();
        

        fetch(APIURL)
        .then(response=>response.json())
        .then(products=>{

      const filtered =products.filter(product=>{
        return(
                product.name.toLowerCase().includes(searchInput)||
                 product.code.toLowerCase().includes(searchInput)
            );
        });
        tableBody.innerHTML="";

filtered.forEach((product,index)=>{
    const tabledata = document.createElement('tr');
                tabledata.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.code}</td>
                    <td>${product.category}</td>
                    <td>${product.location}</td>
                    <td>${product.quantity}</td>
                    <td>Ksh:${product.cost}</td>
                    <td><button class="edit"><i class="material-icons">edit</i></button></td>
                    <td><button class="delete"><i class="material-icons">delete</i></button></td>
                `;
                tableBody.appendChild(tabledata);


    });
    
        });
    });
    }
searchButton();


function filterButton(){
    const filterBtn=document.getElementById('filter');
    filterBtn.addEventListener('click',function(e){
        e.preventDefault();
        const selectCat=document.getElementById('selectCat').value;

        fetch(APIURL)
        .then(response=>response.json())
        .then(products=>{
            const selected=products.filter(product=>{
return(
                 product.category.toLowerCase().includes(selectCat)
            );
        });
        tableBody.innerHTML="";
        selected.forEach((product,index)=>{
    const tabledata = document.createElement('tr');
                tabledata.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${product.name}</td>
                    <td>${product.code}</td>
                    <td>${product.category}</td>
                    <td>${product.location}</td>
                    <td>${product.quantity}</td>
                    <td>Ksh:${product.cost}</td>
                    <td><button class="edit"><i class="material-icons">edit</i></button></td>
                    <td><button class="delete"><i class="material-icons">delete</i></button></td>
                `;
                tableBody.appendChild(tabledata);

            })
        })
    })

}
filterButton();

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
editButton();

    document.addEventListener('DOMContentLoaded', () => {
  displayProducts();
  addProduct();
});

