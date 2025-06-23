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
            tabledata.innerHTML=`<td>${index + 1}</td><td>${product.name}</td><td>${product.code}</td><td>${product.category}</td><td>${product.location}</td><td>${product.quantity}</td><td>Ksh:${product.cost}</td>
            <button class="edit"><i class="material-icons">edit</i></button>
            <button class="delete"><i class="material-icons">delete</i></button>`
           
            tableBody.appendChild(tabledata);

        })
    })

}
displayProducts();
// function to add the product functionality
function addProduct(){

    const addButton=document.getElementById('addbtn');
    addButton.addEventListener("click",function(e){
        e.preventDefault();

        const exsitingForm=document.querySelector('.product-form');
        if(exsitingForm){
            exsitingForm.remove();
        }

    const form=document.createElement('form');
    form.className="product-form";
   
    form.innerHTML=`

                <div class="formClass">

                <label>Product Name</label><input type="text" id="productname" placeholder="Enter product Name">
                <br>
                <label>Code</label><input type="text" id="productCode" placeholder="Enter product code">
                <br>
                <label>Category</label><input type="text" id="productcat" placeholder="Enter product Category">
                <br>
                <label>location</label><input type="text" id="productlocation" placeholder="Enter product location">
                <br>
                <label>Quantity</label><input type="text" id="productQuantity" placeholder="Enter product quantity">
                <br>
                <label>Cost</label><input type="text" id="productcost" placeholder="Enterthe cost here">
                <br>
                <button class="buttongroup" type="submit" id="submit">Submit</button>
                <button class="buttongroup" type="Cancel">Cancel</button>
                </div>


                `;

              
                const middle=document.querySelector('.middle');
                 middle.appendChild(form);
       form.style.display = 'block'; // or toggle a class
    })
//form submission
    form.addEventListener('submit',function(e){
        e.preventDefault();

        const newName=document.querySelector('#productname').value;
        const newCode=document.querySelector('#productCode').value;
        const newCat=document.querySelector('#productcat').value;
        const newLocation=document.querySelector('#productlocation').value;
        const newQuantity=document.querySelector('#productQuantity').value;
        const newCost=document.querySelector('#productcost').value;
    

    fetch(APIURL,{
method:'POST',
headers:{
    'content-type':'application/json'
},
body:JSON.stringify({
    name:newName,
    code:newCode,
    category:newCat,
    location:newLocation,
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
 const cancelBtn = form.querySelector('#Cancel');
        cancelBtn.addEventListener('click', () => {
            form.remove();
        });
    };

addProduct();