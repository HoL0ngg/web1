const userlogin = JSON.parse(localStorage.getItem('userlogin'));

showUserName();
window.onload = function () {
    console.log('hihihi');
}

//do sidebar open and close
const menuIconButton = document.querySelector(".menu-icon-btn");
const sidebar = document.querySelector(".sidebar");
menuIconButton.addEventListener("click", () => {
    sidebar.classList.toggle("open");
});

// tab for section
const sidebars = document.querySelectorAll(".sidebar-list-item.tab-content");
const sections = document.querySelectorAll(".section");

for (let i = 0; i < sidebars.length; i++) {
    sidebars[i].onclick = function () {
        document.querySelector(".sidebar-list-item.active").classList.remove("active");
        document.querySelector(".section.active").classList.remove("active");
        sidebars[i].classList.add("active");
        sections[i].classList.add("active");
    };
}

const closeBtn = document.querySelectorAll('.section');
console.log(closeBtn[0])
for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].addEventListener('click', (e) => {
        sidebar.classList.add("open");
    })
}

// Phân trang 
let perPage = 12;
let currentPage = 1;
let totalPage = 0;
let perProducts = [];

function displayList(productAll, perPage, currentPage) {
    let start = (currentPage - 1) * perPage;
    let end = (currentPage - 1) * perPage + perPage;
    let productShow = productAll.slice(start, end);
    showProductArr(productShow);
}

function setupPagination(productAll, perPage) {
    document.querySelector('.page-nav-list').innerHTML = '';
    let page_count = Math.ceil(productAll.length / perPage);
    for (let i = 1; i <= page_count; i++) {
        let li = paginationChange(i, productAll, currentPage);
        document.querySelector('.page-nav-list').appendChild(li);
    }
}

function paginationChange(page, productAll, currentPage) {
    let node = document.createElement(`li`);
    node.classList.add('page-nav-item');
    node.innerHTML = `<a href="#">${page}</a>`;
    if (currentPage == page) node.classList.add('active');
    node.addEventListener('click', function () {
        currentPage = page;
        displayList(productAll, perPage, currentPage);
        let t = document.querySelectorAll('.page-nav-item.active');
        for (let i = 0; i < t.length; i++) {
            t[i].classList.remove('active');
        }
        node.classList.add('active');
    })
    return node;
}





function attachDeleteEvents() {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function (e) {
            const id = e.target.closest('button').dataset.id;
            const action = e.target.closest('button').dataset.action;
            if (action === 'delete') {
                console.log("Delete button clicked, ID:", id); // Kiểm tra ID sản phẩm
                deleteProduct(parseInt(id)); // Chuyển đổi ID sang số trước khi xóa
            } else if (action === 'restore') {
                console.log("Restore button clicked, ID:", id); // Kiểm tra ID sản phẩm
                changeStatusProduct(parseInt(id)); // Chuyển đổi ID sang số trước khi khôi phục
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    showProduct();
});

function showUserName() {
    if (document.getElementById('name-acc')) document.getElementById('name-acc').innerText = userlogin.username;
}

// Open Popup Modal
let btnAddProduct = document.getElementById("btn-add-product");
btnAddProduct.addEventListener("click", () => {
    document.querySelectorAll(".add-product-e").forEach(item => {
        item.style.display = "block";
    })
    document.querySelectorAll(".edit-product-e").forEach(item => {
        item.style.display = "none";
    })
    document.querySelector(".add-product").classList.add("open");
});

// Close Popup Modal
let closePopup = document.querySelectorAll(".modal-close");
let modalPopup = document.querySelectorAll(".modal");

for (let i = 0; i < closePopup.length; i++) {
    closePopup[i].onclick = () => {
        modalPopup[i].classList.remove("open");
    };
}

// On change Image
function uploadImage(el) {
    const file = el.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector(".upload-image-preview").src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Format Date
function formatDate(date) {
    let fm = new Date(date);
    let yyyy = fm.getFullYear();
    let mm = fm.getMonth() + 1;
    let dd = fm.getDate();
    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;
    return dd + "/" + mm + "/" + yyyy;
}

// Get Order Details

// Sử dụng hàm formatDate và calculateEndDate trong mã của bạn

// function cancelSearchOrder(){
//     let orders = localStorage.getItem("hoadon") ? JSON.parse(localStorage.getItem("hoadon")) : [];
//     document.getElementById("tinh-trang").value = 2;
//     document.getElementById("form-search-order").value = "";
//     document.getElementById("time-start").value = "";
//     document.getElementById("time-end").value = "";
//     showOrder(orders);
// }

function logout() {
    localStorage.removeItem('userlogin');
    localStorage.removeItem('cart');
    location.href = '../index.html';
}