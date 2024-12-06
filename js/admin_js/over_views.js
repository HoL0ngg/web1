// Create Object Thong ke
function createObj() {
    let orders = localStorage.getItem("hoadon") ? JSON.parse(localStorage.getItem("hoadon")) : [];
    let products = localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : [];
    let result = [];

    // Duyệt qua từng hóa đơn để lấy chi tiết
    orders.forEach(order => {
        if (order.trangthai) {
            order.items.forEach(item => {
                // Lấy thông tin sản phẩm
                let prod = products.find(product => product.productid == item.id);
                if (prod) {
                    let obj = {
                        id: item.id,
                        madon: order.id,
                        user: order.user,
                        date: formatDate(order.date),
                        productid: item.id,
                        quantity: item.quantity,
                        category: prod.category,
                        name: prod.name,
                        price: prod.price,
                        total: item.quantity * prod.price,
                        diachi: order.diachi,
                        sdt: order.sdt,
                        trangthai: order.trangthai,
                        thoigiandat: order.date
                    };
                    result.push(obj);
                }
            });
        }
    });

    return result;
}

// Filter 
function thongKe(mode) {
    let categoryTkTmp = document.getElementById("the-loai-tk").value;
    switch (categoryTkTmp) {
        case 'Quạt đứng':
            categoryTk = 'quatdung';
            break;
        case 'Quạt treo tuờng':
            categoryTk = 'quattreotuong';
            break;
        case 'Quạt trần':
            categoryTk = 'quattran';
            break;
        case 'Quạt lửng':
            categoryTk = 'quatlung';
            break;
        case 'Tất cả':
            categoryTk = 'Tất cả';
            break;
    }
    let ct = document.getElementById("form-search-tk").value;
    let timeStart = document.getElementById("time-start-tk").value;
    let timeEnd = document.getElementById("time-end-tk").value;

    if (timeEnd < timeStart && timeEnd !== "" && timeStart !== "") {
        alert("Lựa chọn thời gian sai!");
        return;
    }

    let arrDetail = createObj();

    // Lọc theo thể loại
    let result = categoryTk === "Tất cả" ? arrDetail : arrDetail.filter((item) => {
        return item.category === categoryTk;
    });

    // Lọc theo tiêu chí tìm kiếm
    result = ct === "" ? result : result.filter((item) => {
        return item.name.toLowerCase().includes(ct.toLowerCase());
    });

    // Lọc theo thời gian
    // Lọc theo thời gian
    if (timeStart !== "" && timeEnd === "") {
        result = result.filter((item) => {
            let itemDate = new Date(item.date.split("/").reverse().join("-"));
            return itemDate >= new Date(new Date(timeStart).setHours(0, 0, 0));
        });
    } else if (timeStart === "" && timeEnd !== "") {
        result = result.filter((item) => {
            let itemDate = new Date(item.date.split("/").reverse().join("-"));
            return itemDate <= new Date(new Date(timeEnd).setHours(23, 59, 59));
        });
    } else if (timeStart !== "" && timeEnd !== "") {
        result = result.filter((item) => {
            let itemDate = new Date(item.date.split("/").reverse().join("-"));
            return itemDate >= new Date(new Date(timeStart).setHours(0, 0, 0)) &&
                itemDate <= new Date(new Date(timeEnd).setHours(23, 59, 59));
        });
    }

    // Hiển thị thống kê
    showThongKe(result, mode);
}


// Show số lượng sp, số lượng đơn bán, doanh thu
function showOverview(arr) {
    let activeProducts = arr.filter(item => item.trangthai);
    document.getElementById("quantity-product").innerText = activeProducts.length;
    document.getElementById("quantity-order").innerText = activeProducts.reduce((sum, cur) => (sum + parseInt(cur.quantity)), 0);
    document.getElementById("quantity-sale").innerText = vnd(activeProducts.reduce((sum, cur) => (sum + parseInt(cur.total)), 0));
}

function showThongKe(arr, mode) {
    let orderHtml = "";
    let mergeObj = mergeObjThongKe(arr);
    showOverview(mergeObj);

    switch (mode) {
        // case 0:
        //     mergeObj = mergeObjThongKe(createObj());
        //     showOverview(mergeObj);
        //     document.getElementById("the-loai-tk").value = "Tất cả";
        //     document.getElementById("form-search-tk").value = "";
        //     document.getElementById("time-start-tk").value = "";
        //     document.getElementById("time-end-tk").value = "";
        //     break;
        case 1:
            mergeObj.sort((a, b) => parseInt(a.quantity) - parseInt(b.quantity));
            break;
        case 2:
            mergeObj.sort((a, b) => parseInt(b.quantity) - parseInt(a.quantity));
            break;
    }
    for (let i = 0; i < mergeObj.length; i++) {
        orderHtml += `
        <tr>
            <td>${i + 1}</td>
            <td><div class="prod-img-title"><p>${mergeObj[i].name}</p></div></td>
            <td>${mergeObj[i].quantity}</td>
            <td>${vnd(mergeObj[i].total)}</td>
            <td><button class="btn-detail product-order-detail" data-id="${mergeObj[i].id}"><i class="fa-solid fa-eye"></i> Chi tiết</button></td>
        </tr>`;
    }
    document.getElementById("showTk").innerHTML = orderHtml;
    document.querySelectorAll(".product-order-detail").forEach(item => {
        let idProduct = item.getAttribute("data-id");
        item.addEventListener("click", () => {
            detailOrderProduct(arr, idProduct);
        });
    });
}

// Gọi hàm showThongKe để hiển thị dữ liệu
showThongKe(createObj());

function mergeObjThongKe(arr) {
    let result = [];
    arr.forEach(item => {
        let check = result.find(i => i.id == item.id) // Không tìm thấy gì trả về undefined

        if (check) {
            check.quantity = parseInt(check.quantity) + parseInt(item.quantity);
            check.total += parseInt(item.price) * parseInt(item.quantity);
        } else {
            const newItem = { ...item }
            newItem.total = newItem.price * newItem.quantity;
            result.push(newItem);
        }

    });
    return result;
}

function detailOrderProduct(arr, id) {
    let orderHtml = "";
    arr.forEach(item => {
        if (item.id == id) {
            orderHtml += `<tr>
            <td>${item.madon}</td>
            <td>${item.quantity}</td>
            <td>${vnd(item.price)}</td>
            <td>${formatDate(item.date)}</td>
            </tr>`;
        }
    });
    document.getElementById("show-product-order-detail").innerHTML = orderHtml;
    document.querySelector(".modal.detail-order-product").classList.add("open");
}




//customer thôgns kê
function switchView() {
    const productTable = document.getElementById('productTable');
    const customerTable = document.getElementById('customerTable');
    
    if (productTable.style.display === 'none') {
        productTable.style.display = 'block';
        customerTable.style.display = 'none';
    } else {
        productTable.style.display = 'none';
        customerTable.style.display = 'block';
    }
}

// Hàm tạo dữ liệu thống kê từ localStorage cho khách hàng

function createObjCus() {
    const orders = localStorage.getItem("hoadon") ? JSON.parse(localStorage.getItem("hoadon")) : [];
    const products = localStorage.getItem("productList") ? JSON.parse(localStorage.getItem("productList")) : [];
    const productMap = new Map(products.map(prod => [prod.productid, prod]));
    const result = new Map();

    orders.forEach(order => {
        if (order.trangthai) {
            order.items.forEach(item => {
                const prod = productMap.get(parseInt(item.id));
                if (prod) {
                    if (result.has(order.user.username)) {
                        const existingUser = result.get(order.user.username);
                        existingUser.quantity += parseInt(item.quantity);
                        existingUser.total += item.quantity * prod.price;
                        existingUser.orders.push({
                            madon: order.id,
                            productid: item.id,
                            quantity: item.quantity,
                            price: prod.price,
                            date: formatDate(order.date)
                        });
                    } else {
                        result.set(order.user, {
                            user: order.user.username,
                            quantity: parseInt(item.quantity),
                            total: item.quantity * prod.price,
                            orders: [{
                                madon: order.id,
                                productid: item.id,
                                quantity: item.quantity,
                                price: prod.price,
                                date: formatDate(order.date)
                            }]
                        });
                    }
                }
            });
        }
    });

    return Array.from(result.values());
}
function detailOrderCustomer(arr, user) {
    let orderHtml = "";
    const userObj = arr.find(item => item.user.username === user.username);

    if (userObj) {
        const addedOrders = new Set(); // Sử dụng Set để lưu trữ các mã đơn đã thêm
        userObj.orders.forEach(order => {
            const uniqueOrderIdentifier = `${order.madon}-${order.productid}`;
            if (!addedOrders.has(uniqueOrderIdentifier)) {
                orderHtml += `
                <tr>
                    <td>${order.madon}</td>
                    <td>${order.quantity}</td>
                    <td>${vnd(order.price)}</td>
                    <td>${order.date}</td>
                </tr>`;
                addedOrders.add(uniqueOrderIdentifier); // Thêm mã đơn vào Set
            }
        });
    }

    document.getElementById("show-customer-order-detail").innerHTML = orderHtml;
    document.querySelector(".modal.detail-order-product").classList.add("open");
}

// Thêm sự kiện cho các nút Chi tiết khách hàng
function addCustomerDetailButtonsEventListeners(arr) {
    document.querySelectorAll(".customer-order-detail").forEach(button => {
        button.addEventListener("click", () => {
            const user = button.getAttribute("data-user");
            detailOrderCustomer(arr, user);
        });
    });
}
function showThongKeCustomer(arr) {
    let orderHtml = "";
    arr.forEach((item, index) => {
        orderHtml += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.user}</td>
            <td>${item.quantity}</td>
            <td>${vnd(item.total)}</td>
            <td><button class="btn-detail customer-order-detail" data-user="${item.user}"><i class="fa-solid fa-eye"></i> Chi tiết</button></td>
        </tr>`;
    });

    document.getElementById("showTkCustomer").innerHTML = orderHtml;
    addCustomerDetailButtonsEventListeners(arr);
}

// Gọi hàm hiển thị khi trang tải
document.addEventListener("DOMContentLoaded", () => {
    const customerData = createObjCus();
    showThongKeCustomer(customerData);

    const productData = createObj(); // Hàm createObj() tạo dữ liệu thống kê sản phẩm
    showThongKeSanPham(productData);

    document.getElementById("form-search-tk").addEventListener("input", () => filterAndSearch());
});


function filterAndSearch(mode) {
    const searchValue = document.getElementById("form-search-tk").value.toLowerCase();
    let arr = createObjCus();
    
    // Lọc theo tên khách hàng
    let filteredArr = arr.filter(item => item.user.toLowerCase().includes(searchValue));

    // Lọc giá theo mode
    switch (mode) {
        case 1:
            filteredArr.sort((a, b) => a.total - b.total);
            break;
        case 2:
            filteredArr.sort((a, b) => b.total - a.total);
            break;
    }

    // Hiển thị kết quả lọc và tìm kiếm
    showFilteredResults(filteredArr);
}

function showFilteredResults(arr) {
    let orderHtml = "";
    arr.forEach((item, index) => {
        orderHtml += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.user}</td>
            <td>${item.quantity}</td>
            <td>${vnd(item.total)}</td>
            <td><button class="btn-detail customer-order-detail" data-user="${item.user}"><i class="fa-solid fa-eye"></i> Chi tiết</button></td>
        </tr>`;
    });

    document.getElementById("showTkCustomer").innerHTML = orderHtml;
    addCustomerDetailButtonsEventListeners(arr);
}