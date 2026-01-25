
$(document).ready(function () {

        $('#auth_form').on('submit', function (e) {
                e.preventDefault();
                let username = $('#username').val();
                let password = $('#password').val();
                $.ajax({
                        url: "/api/authAdminLogin",
                        type: "post",
                        contentType: 'application/json',
                        data: JSON.stringify({ username, password }),
                        success: function (data) {
                                if (data.status == "success") {
                                        window.location.href = "/Dashboard"
                                } else {
                                        $('#msg').html(`<p class='alert alert-danger'>${data.message}</p>`);
                                }

                        },

                        error: function (xhr) {
                                $('#msg').html("<p class='alert alert-danger' style'text-align:center'>A database error has occured</p>");
                                console.error('Login failed:', xhr.status, xhr.responseText);
                        }

                })
        })

        $('#passUsername').on('click', function () {
                let getusername = $('#getUsername').data('username');
                localStorage.setItem('displayAdmin', getusername)
        })
        $('#basic-addon2').on('click', function () {
                let username = $('#username').val();
                let password = $('#password').val();
                if (password == "") {
                        $('#msg').html("<p class='text-danger'>Password field must not be empty</p>");
                }
                else {
                        $.ajax({
                                url: "api/authAdminLogin",
                                type: "post",
                                contentType: "application/json",
                                data: JSON.stringify({ username, password }),
                                success: function (data) {
                                        if (data.status == "success") {
                                                window.location.href = '/Dashboard';
                                        } else {
                                                $('#msg').html(`<p class='text-danger'>${data.message}</p>`);
                                        }
                                },
                                error: function (xhr) {
                                        $('#msg').html("<p class='text-danger' style'text-align:center'>A database error has occured</p>");
                                        console.error('Login failed:', xhr.status, xhr.responseText);
                                }
                        });
                }
        });

        let sizes = [];
        let color = [];
        $("#basic-addon2").on("click", function () {
                const size = $("#sizeInput").val().trim().toUpperCase();
                if (!size || sizes.includes(size)) return;

                sizes.push(size);

                $("#previewSizes").append(`<li style="float:left; margin-left:2%; list-style:none; font-size:smaller">${size}</li>`);
                $("#sizesContainer").append(
                        `<input type="hidden" name="sizes[]" id='sizes[]' value="${size}">`
                );

                $("#sizeInput").val("");
        });


        $('.addColor').on('click', function () {
                const productColor = $("#colorInput").val().trim().toUpperCase();
                if (!productColor || color.includes(productColor)) return;

                color.push(productColor);

                $("#previewColor").append(`<li style="float:left; margin-left:2%; list-style:none; font-size:smaller">${productColor}</li>`);
                $("#colorContainer").append(
                        `<input type="hidden" name="color[]" value="${productColor}">`
                );

                $("#colorInput").val("");
        })


        $('#productUpload').on('submit', function (e) {
                e.preventDefault();
                const formdata = new FormData();
                formdata.append('category', $('#productCategory').val())
                formdata.append('name', $('#productName').val());
                formdata.append('price', $('#productPrice').val());
                // formdata.append('size',('#sizeInput').val());
                formdata.append('quantity', $('#productQuantity').val());
                // formdata.append('color',('#colorInput').val());
                sizes.forEach(size => {
                        formdata.append("sizes[]", size);
                });
                color.forEach(productColor => {
                        formdata.append("color[]", productColor);
                });
                formdata.append("image", $("#image")[0].files[0]);
                formdata.append('description', $('#productDescription').val());


                $.ajax({
                        url: "api/uploadProducts",
                        type: "POST",
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success: function (res) {
                                if (res.status == 'success') {
                                        $('#msg').html(`<p class='alert alert-success'>${res.message}</p>`)
                                } else {
                                        $('#msg').html(`<p class='alert alert-danger'>error saving data to database</p>`)
                                }
                        },
                        error: function () {
                                $('#msg').html(`<p class='alert alert-danger'>database Error</p>`)
                        }

                })


        });


        $('#productUpload').on('submit', function (e) {
                e.preventDefault();
                const formdata = new FormData();
                formdata.append('category', $('#productCategory').val())
                formdata.append('name', $('#productName').val());
                formdata.append('price', $('#productPrice').val());
                // formdata.append('size',('#sizeInput').val());
                formdata.append('quantity', $('#productQuantity').val());
                // formdata.append('color',('#colorInput').val());
                sizes.forEach(size => {
                        formdata.append("sizes[]", size);
                });
                color.forEach(productColor => {
                        formdata.append("color[]", productColor);
                });
                formdata.append("image", $("#image")[0].files[0]);
                formdata.append('description', $('#productDescription').val());


                $.ajax({
                        url: "api/uploadProducts",
                        type: "POST",
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success: function (res) {
                                if (res.status == 'success') {
                                        $('#msg').html(`<p class='alert alert-success'>${res.message}</p>`)
                                } else {
                                        $('#msg').html(`<p class='alert alert-danger'>error saving data to database</p>`)
                                }
                        },
                        error: function () {
                                $('#msg').html(`<p class='alert alert-danger'>database Error</p>`)
                        }

                })



        });

        $('#editProduct').on('submit', function (e) {
                e.preventDefault();
                const formdata = new FormData();
                formdata.append('category', $('#productCategory').val())
                formdata.append('name', $('#productName').val());
                formdata.append('price', $('#productPrice').val());
                // formdata.append('size',('#sizeInput').val());
                formdata.append('quantity', $('#productQuantity').val());
                // formdata.append('color',('#colorInput').val());
                const cleanedSizes = $('#sizeInput').val().split(",")
                        .map(s => s.trim().toUpperCase()).filter(Boolean).join(", ");
                const newsize = cleanedSizes
                formdata.append('sizes', newsize)

                const cleanedcolor = $('#colorInput').val().split(",")
                        .map(s => s.trim().toUpperCase()).filter(Boolean).join(", ");
                const newcolor = cleanedcolor
                formdata.append('color', newcolor)
                formdata.append("image", $("#image")[0].files[0]);
                formdata.append('description', $('#productDescription').val());
                formdata.append('status', $('#status').val());
                formdata.append('id', $('#productID').val());


                $.ajax({
                        url: "api/editProduct",
                        type: "POST",
                        data: formdata,
                        processData: false,
                        contentType: false,
                        success: function (res) {
                                if (res.status == 'success') {
                                        $('#msg').html(`<p class='alert alert-success'>${res.message}</p>`)
                                } else {
                                        $('#msg').html(`<p class='alert alert-danger'>error saving data to database</p>`)
                                }
                        },
                        error: function () {
                                $('#msg').html(`<p class='alert alert-danger'>database Error</p>`)
                        }

                })


        });
        $('.delete').on('click', function () {
                const getProuctById = $(this).data('getid');
                if (!confirm("Are you sure you want to dDelete this product?")) return;
                $.ajax({
                        url: `api/deleteProduct/`,
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify({ id: getProuctById }),
                        success: function (res) {
                                if (res.status == "success") {
                                        alert(res.status);
                                }
                        },
                        error: function () {
                                alert('data base error');
                        }

                })
        })

});