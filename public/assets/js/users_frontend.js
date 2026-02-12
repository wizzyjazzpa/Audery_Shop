$(document).ready(function () {

    displayCart();
    displayCart_table();
    updateCartCount();
    
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
            image:image
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

    cart.forEach(function(item) {
        subtotal += item.productPrice * item.qty;
    });

    return subtotal;
}


//remove item from cart

// Use delegated event because items are dynamic
$('#display_cart').on('click', '.remove', function() {
    const index = $(this).data('index');
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Remove the item at that index
    cart.splice(index, 1);

    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Refresh the cart display
    displayCart();
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
                                            <a href="#">Elastic Waist Dress </a>
                                        </div>
                                        
                                        <div class="cart__meta-text">
                                            Color: Navy<br>Size: Small<br>
                                        </div>
                                    </td>
                                    <td class="cart__price-wrapper cart-flex-item">
                                        <span class="money">$735.00</span>
                                    </td>
                                    <td class="cart__update-wrapper cart-flex-item text-right">
                                        <div class="cart__qty text-center">
                                            <div class="qtyField">
                                                <a class="qtyBtn minus" href="javascript:void(0);"><i class="icon icon-minus"></i></a>
                                                <input class="cart__qty-input qty" type="text" name="updates[]" id="qty" value="1" pattern="[0-9]*">
                                                <a class="qtyBtn plus" href="javascript:void(0);"><i class="icon icon-plus"></i></a>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="text-right small--hide cart-price">
                                        <div><span class="money">$735.00</span></div>
                                    </td>
                                    <td class="text-center small--hide"><a href="#" class="btn btn--secondary cart__remove" title="Remove tem"><i class="icon icon anm anm-times-l"></i></a></td>
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





