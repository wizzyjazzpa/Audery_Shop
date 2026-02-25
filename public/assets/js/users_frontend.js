$(document).ready(function () {

    displayCart();
    displayCart_table();
    updateCartCount();
    updateTotal();
    diplayCheckOutCart();
    disable_btn_order();

     function disable_btn_order(){
        let cart = JSON.parse(localStorage.getItem('cart'));
        if(!cart || cart.length ===0){
            $('#btn_order').prop('disabled',true);
        }
     }
    $('#add_cart').on('click', function () {
        const product_id = $('#product_id').val();
        const product_price = Number($('#product_price').text().replace(/,/g, ''));
        const product_name = $('#product_name').text();
        const quantity = Number($('#Quantity').val());
        const image = $('#getimage').val().toLowerCase();
        const product = {
            productId: product_id,
            productName: product_name,
            productPrice: product_price,
            size: $('input[name="option-1"]:checked').val(),
            qty: quantity,
            image: image
        };

        if (!product.size) {
            alert('Please select a size');
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existing = cart.find(
            item => item.productId === product.productId && item.size === product.size
        );

        if (existing) {
            existing.qty += product.qty; // ✅ numeric addition
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));

        updateCartCount();
        displayCart();
    });

})


function diplayCheckOutCart(){
    let cart = JSON.parse(localStorage.getItem('cart'));
    
    const $cartTable = $('#checkout_table');
    $cartTable.empty(); // Clear existing list

    if (!cart || cart.length === 0) {
        $cartTable.append("<tr><td><p class='alert alert-info'>Your cart is empty</p></td></tr>");
        $('#subtotal').text('0');
        return;
    }
     cart.forEach(function(item,index){
         const total = item.productPrice * item.qty;
         const tbody= ` <tr>
                                            <td class="text-left">${item.productName}</td>
                                            <td>₦${item.productPrice.toLocaleString()}</td>
                                            <td>${item.size}</td>
                                            <td>${item.qty}</td>
                                            <td>₦${total.toLocaleString()}</td>
                                        </tr>
                                       
                                        
                                        `
         $cartTable.append(tbody);
        const subtotal = calculateSubtotal();
        $('#total').text("₦"+subtotal.toLocaleString());

     })
      
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const count = cart.reduce((sum, item) => {
        return sum + Number(item.qty);
    }, 0);

    $('#CartCount').text(count);

}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    console.log("cart data: ", cart)

    const $cartList = $('#display_cart');
    $cartList.empty(); // Clear existing list

    if (!cart || cart.length === 0) {
        $cartList.append('<li>Your cart is empty</li>');
        $('#subtotal').text('0');
        return;
    }

    cart.forEach(function (item, index) {
        const total = item.productPrice * item.qty;

        const li = `
            

                              <li class="item">
                                	<a class="product-image" href="#">
                                    	<img src="uploads/${item.image}" alt="product image" title="" />
                                    </a>
                                    <div class="product-details">
                                    	<a  class="remove" data-index='${index}'><i class="anm anm-times-l" aria-hidden="true"></i></a>
                                        <a href="#" class="edit-i remove"><i class="anm anm-edit" aria-hidden="true"></i></a>
                                        <a class="pName" href="cart.html">${item.productName} </a>
                                        <div class="variant-cart">Size:${item.size}</div>
                                        <div class="wrapQtyBtn">
                                            <div class="qtyField">
                                            	<span class="label">Qty:</span>
                                                <a class="qtyBtn minus" ><i class="fa anm anm-minus-r" aria-hidden="true"></i></a>
                                                <input type="text" id="Quantity" name="quantity" value="${item.qty}" class="product-form__input qty">
                                                <a class="qtyBtn plus" href=";"><i class="fa anm anm-plus-r" aria-hidden="true"></i></a>
                                            </div>
                                        </div>
                                       	<div class="priceRow">
                                            <div class="product-price">
                                                <span class="money">₦${item.productPrice.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
        `;

        $cartList.append(li);
        const subtotal = calculateSubtotal();
        $('#subtotal').text(subtotal);
        // alert(item.productPrice)
    });
    const subtotal = cart.reduce((acc, item) => acc + item.productPrice * item.qty, 0);
    $('#subtotal').text(subtotal.toLocaleString());
}

function calculateSubtotal() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let subtotal = 0;

    cart.forEach(function (item) {
        subtotal += item.productPrice * item.qty;
    });

    return subtotal;
}


//remove item from cart

// Use delegated event because items are dynamic
$('#display_cart').on('click', '.remove', function () {
    const index = $(this).data('index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item at that index
    cart.splice(index, 1);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the cart display
    displayCart();
    updateCartCount();
    disable_btn_order();
});


function displayCart_table() {
    let cart = JSON.parse(localStorage.getItem('cart'));


    const $cartTable = $('#display_cart_table');
    $cartTable.empty(); // Clear existing list

    if (!cart || cart.length === 0) {
        $cartTable.append("<tr><td><p class='alert alert-info'>Your cart is empty</p></td></tr>");
        $('#subtotal').text('0');
        return;
    }

    cart.forEach(function (item, index) {
        const total = item.productPrice * item.qty;

        const tbody = `
                                 <tr class="cart__row border-bottom line1 cart-flex border-top">
                                    <td class="cart__image-wrapper cart-flex-item">
                                        <a href="#"><img class="cart__image" src="uploads/${item.image}" alt="Elastic Waist Dress - Navy / Small"></a>
                                    </td>
                                    <td class="cart__meta small--text-left cart-flex-item">
                                        <div class="list-view-item__title">
                                            <a href="#">${item.productName} </a>
                                        </div>
                                        
                                        <div class="cart__meta-text">
                                            <br>Size: ${item.size}<br>
                                        </div>
                                    </td>
                                    <td class="cart__price-wrapper cart-flex-item">
                                       ₦<span class="money">${item.productPrice.toLocaleString()}</span>
                                    </td>
                                    <td class="cart__update-wrapper cart-flex-item text-right">
                                        <div class="cart__qty text-center">
                                            <div class="qtyField">
                                                <a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a>
                                                <input class="cart__qty-input qty" type="text" name="updates[]" id="qty" value="${item.qty}" pattern="[0-9]*">
                                                <a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right small--hide cart-price">
                                        <div>₦<span class="money">${item.productPrice.toLocaleString()}</span></div>
                                    </td>
                                    <td class="text-center small--hide"><a  class="btn btn--secondary cart__remove" title="Remove item"><i class="icon icon anm anm-times-l"></i></a></td>
                                </tr>

        `;

        $cartTable.append(tbody);
        const subtotal = calculateSubtotal();
        $('#subtotal').text(subtotal);
        // alert(item.productPrice)
    });
    const subtotal = cart.reduce((acc, item) => acc + item.productPrice * item.qty, 0);
    $('#subtotal').text(subtotal.toLocaleString());
}

$('#display_cart_table').on('click', '.cart__remove', function () {

    const index = $(this).data('index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item at that index
    cart.splice(index, 1);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the cart display
    displayCart_table();
    disable_btn_order();
});
$('#clear_cart').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('cart');
    displayCart();
    displayCart_table();
    updateCartCount();
})

function calculateGrandTotal() {
    const subtotal = calculateSubtotal();
    const shipping = 2000;
    const taxRate = 0.05;

    const tax = subtotal * taxRate;
    const grandTotal = subtotal + shipping + tax;
    return { subtotal, shipping, tax, grandTotal };

}

function updateTotal() {
    const totals = calculateGrandTotal();
    $('#sub').text("₦" + totals.subtotal.toLocaleString())
    $('#tax').text("₦" + totals.tax.toLocaleString());
    $('#grand_total').text("₦" + totals.grandTotal.toLocaleString());
}

$('#cartCheckout').on('click', function () {
    window.location.href = '/checkout'
})

$('#CustomerLoginForm').on('submit', function (e) {
    e.preventDefault();
    let firstname = $('#FirstName').val();
    let lastname = $('#LastName').val();
    let email = $('#CustomerEmail').val();
    let password = $('#CustomerPassword').val();
    $.ajax({
        url: "/api/registerUsers",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({ firstname, lastname, email, password }),
        success: function (data) {
            if (data.message == "successfull") {

                $('#preloader').fadeIn();

                // Redirect after 2 seconds
                setTimeout(function () {
                    window.location.href = '/login';
                }, 2000);

            } else if (data.status == 500) {
                $('#msg').html(`<p class="alert alert-info">user ${email} already exists</p>`)
                console.log(`Email ${email} already exists`)
            }
        },
        error: function (xhr) {
            console.log("database error has ocuured: ", xhr.status, xhr.responseText)
        }
    })
})

$('#CustomerLoginForm2').on('submit', function (e) {
    e.preventDefault();
      let email = $('#CustomerEmail').val();
    let password = $('#CustomerPassword').val();
    if (email === "" && passowrd === "") {
        $('#msg').html(`<p class="alert alert-danger">All input fields must be filled</p>`);
    } else {
        $.ajax({
            url: "/api/userlogin",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ email, password }),
            success: function (data) {
                if (data.status == 200) {
                    console.log(data.token)
                    $('#preloader').fadeIn();

                    // Redirect after 2 seconds
                    setTimeout(function () {
                        window.location.href = '/';
                    }, 2000);
                } else {
                    $('#msg').html(`<p class="alert alert-danger">incorrect email/password</p>`);
                }
            },
            error: function (xhr) {
                console.log("Error:", xhr.status, xhr.responseText);
            }

        });
    }

})

$('#country').on('change',function(){
     let countryCode = $(this).val();
     $('#state').html('<option>Loadig......</option>');
     $.get(`/api/states/${countryCode}`,function(data){

        let options ="<option value=''></option>";
        data.forEach(function(state){
             options +=`<option value="${state.name}" selected>${state.name}</option>`
        });

        $('#state').html(options)

     });
})

//submit data in cart to database

$('#order').on('submit',function(e){
    e.preventDefault();
    let userid = $('#userid').val();
    let firstname = $('#firstname').val();
    let lastname = $('#lastname').val();
    let email = $('#email').val();
    let  tel = $('#telephone').val();
    let city = $('#city').val();
    let postalcode = $('#postcode').val();
    let country = $('#country').val();
    let state = $('#state').val();
    let address = $('#address').val();
     
    let cart = JSON.parse(localStorage.getItem('cart'));

    if (!cart || cart.length === 0) {
        alert("Cart is empty");
        return;
    }

    $.ajax({
        url: "/api/place_order",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({ cart, userid,firstname,lastname,email,tel,city,postalcode,country,state,address }),

        success: function (res) {
            if (res.status === 200) {
                alert("Order placed successfully");

                // Clear cart after successful order
                localStorage.removeItem('cart');
                alert("Thanks for shopping with Audrey's Store");
            }
        },

        error: function (err) {
            console.log(err);
        }
    });



})

// most click products
 $('.product_link').on('click',function(){

     const productId = $(this).data('id');
     let clickedProducts = JSON.parse(localStorage.getItem('clickedProducts')) ||[];
     if(!clickedProducts.includes(productId)){
        $.post('/api/product/click/' + productId)

        clickedProducts.push(productId);
        localStorage.setItem('clickedProducts',JSON.stringify(clickedProducts));
     }
      
 });



