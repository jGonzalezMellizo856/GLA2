document.addEventListener("DOMContentLoaded", function(){
    const productList = document.getElementById("productList");
    const categoryFilter = document.getElementById("categoryFilter");
    const sortAscdending = document.getElementById("sortAscending");
    const sortDescending = document.getElementById("sortDescending");
    const applyFilterBtn = document.getElementById("applyFilter");

    let products = []; // store fetched products


    //fetch data from the api 
    const api = 'https://fakestoreapi.com/products';
    function fetchData (){
        fetch(api)
        .then(response => response.json())
        .then(data => {
            products = data;
            console.log(data);
            displayProducts(products);
            populateCategoryFilter();
        })
        .catch(error => console.error("Error fetching data: ", error));
    }

    //populates the filters on the page
    function populateCategoryFilter() {
        const categories = products.reduce((acc, product) => {
            if (!acc.includes(product.category)) {
                acc.push(product.category);
            }
            return acc;
        }, []);

       
        categories.forEach(category => {
            const option = document.createElement("option");
            option.textContent = category;
            option.value = category.toLowerCase(); 
            categoryFilter.appendChild(option);
        });
    }


    //display the products on the page 
    function displayProducts(productsArray){
        productList.innerHTML = "";
        productsArray.forEach(product => {
            const productDiv = document.createElement("div");
            productDiv.classList.add("product");
            productDiv.innerHTML = `
            <h3>${product.title}</h3>
            <p>Category: ${product.category}</p>
            <p>Price: ${product.price}</p>
            <img src="${product.image}" alt="${product.name}" style="max-width: 25%; height: 25%;">
            <p>Description:${product.description}</p>
            `;
            productList.appendChild(productDiv);
        });
    }

    applyFilterBtn.addEventListener("click", function(){
        let filteredProduct = products;


        //filter category 
        const selectedCategory = categoryFilter.value;
        
        if(selectedCategory !== "all"){
            filteredProduct = filteredProduct.filter(product => product.category.toLowerCase() === selectedCategory.toLowerCase());

            console.log(filteredProduct);
        }
        //sort by price
        if (sortAscdending.checked){
            filteredProduct.sort((a, b) => a.price - b.price);
        }else if(sortDescending.checked){
            filteredProduct.sort((a, b) => b.price - a.price);
        }

        displayProducts(filteredProduct);

    });

    fetchData();


});