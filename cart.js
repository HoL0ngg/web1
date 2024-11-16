const payment = document.getElementById('payment-method');
const payment_popup = document.getElementById('payment-method-popup');
let icon_active = null;

function checknumber(inp) {
    inp.value = inp.value.replace(/[^0-9]/g, '');

    if (inp.value.trim().length != inp.maxLength) {
        inp.parentElement.classList.add('invalid');
        inp.parentElement.classList.remove('valid');
        inp.focus();
        return false;
    } else {
        inp.parentElement.classList.remove('invalid');
        inp.parentElement.classList.add('valid');
        return true;
    }
}

function DinhDangSoThe(inputElement) {
    // Lấy giá trị hiện tại và loại bỏ các ký tự không phải số
    let value = inputElement.value.replace(/[^0-9]/g, '');

    // Chia giá trị thành các nhóm 4 số và nối bằng dấu ' - '
    let formattedValue = value.match(/.{1,4}/g)?.join('-') || '';

    // Gán giá trị định dạng lại vào input
    inputElement.value = formattedValue;

    if (inputElement.value.trim().length != 19) {
        inputElement.parentElement.classList.add('invalid');
        inputElement.parentElement.classList.remove('valid');
        inputElement.focus();
        return false;
    } else {
        inputElement.parentElement.classList.remove('invalid');
        inputElement.parentElement.classList.add('valid');
        return true;
    }
}


function DinhDangNgay(inp) {
    let value = inp.value.replace(/[^0-9]/g, ''); // Loại bỏ ký tự không phải số
    if (value.length > 2) {
        value = value.slice(0, 2) + '/' + value.slice(2); // Thêm dấu '/' sau 2 số đầu
    }
    inp.value = value; // Cập nhật giá trị trong ô input

    // check giá trị ngày
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!regex.test(inp.value)) {
        inp.parentElement.classList.add('invalid');
        inp.parentElement.classList.remove('valid');
        inp.focus();
        return false; // Sai định dạng
    }

    const [month, year] = inp.value.split('/');
    const currentYear = new Date().getFullYear() % 100; // Lấy 2 chữ số cuối của năm hiện tại
    const currentMonth = new Date().getMonth() + 1; // Tháng hiện tại (0-11)

    // Kiểm tra nếu năm nhỏ hơn năm hiện tại hoặc năm bằng nhưng tháng nhỏ hơn
    if (year < currentYear || (year == currentYear && month < currentMonth)) {
        inp.parentElement.classList.add('invalid');
        inp.parentElement.classList.remove('valid');
        inp.focus();
        return false; // Ngày tháng đã qua
    }
    inp.parentElement.classList.remove('invalid');
    inp.parentElement.classList.add('valid');
    return true; // Ngày tháng hợp lệ
}


function MoPopUpThanhtoan(icon) {
    if (icon_active) {
        icon_active.classList.remove('active');
    }
    icon_active = icon;
    icon_active.classList.add('active');

    payment_popup.classList.add('show');
    payment.classList.add('show');
    payment.style.display = 'block';
}

function DongPopUpThanhtoan() {
    document.getElementById('payment-form').reset();
    document.querySelectorAll('.payment-input').forEach(inp => inp.classList.remove('valid'));
    document.querySelectorAll('.payment-input').forEach(inp => inp.classList.remove('invalid'));
    // document.querySelectorAll('.payment-icon').forEach(icon => icon.classList.remove('active'));
    payment_popup.classList.remove('show');
    payment.classList.remove('show');
    setTimeout(() => {
        payment.style.display = 'none';
    }, 500);
}

// Đóng modal khi nhấn phím ESC
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        DongPopUpThanhtoan();
    }
});

// Đóng modal khi click bên ngoài nội dung
payment.addEventListener('click', function (event) {
    if (!payment_popup.contains(event.target)) {
        DongPopUpThanhtoan();
    }
});

function checkInput(inp) {
    let val = inp.value;
    if (val.trim() == '') {
        inp.parentElement.classList.add('invalid');
        inp.parentElement.classList.remove('valid');
        inp.focus();
        return false;
    } else {
        inp.parentElement.classList.remove('invalid');
        inp.parentElement.classList.add('valid');
        return true;
    }
}

function checkEmail(inp) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(inp.value)) {
        inp.parentElement.classList.remove('invalid');
        inp.parentElement.classList.add('valid');
        return true;
    } else {
        inp.parentElement.classList.add('invalid');
        inp.parentElement.classList.remove('valid');
        inp.focus();
        return false;
    }
}

function checkName(inp) {
    let value = inp.value.replace(/[0-9]/g, ''); // Loại bỏ ký tự không phải số
    inp.value = value;
    if (value.trim() == '') {
        inp.parentElement.classList.add('invalid');
        inp.parentElement.classList.remove('valid');
        inp.focus();
        return false;
    } else {
        inp.parentElement.classList.remove('invalid');
        inp.parentElement.classList.add('valid');
        return true;
    }
}

function checkThanhToan() {
    const ThanhToanBtn = document.getElementById('ThanhToanbtn');
    console.log(ThanhToanBtn);
    alert('Ban phai chon phuong thuc thanh toan o duoi');
}

document.getElementById('payment-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let flag = true;
    flag &= checkName(document.getElementById('firstname'));
    flag &= checkName(document.getElementById('lastname'));
    flag &= checkEmail(document.getElementById('email'));
    flag &= checkInput(document.getElementById('diachi'));
    flag &= DinhDangSoThe(document.getElementById('sothe'));
    flag &= checknumber(document.getElementById('ccv'));
    flag &= DinhDangNgay(document.getElementById('hanthe'));
    flag &= checknumber(document.getElementById('zipcode'));
    // console.log(flag);
    if (flag) {
        icon_active.classList.add('active');
        DongPopUpThanhtoan();
    }
})

function displayToast(msg) {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    const toastmsg = document.getElementById('toast-msg');
    toastmsg.innerText = msg;
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2900);
}

let productArray = [
    {
        productid: 'DH1600', brandid: 'Senko', img: '../hinhanh/quatdien/fan1.jpg', name: 'Quạt đứng Senko DH1600',
        size: 'Ngang 37.5cm - Cao 109 - 123cm - Sâu 41cm', power: '47W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2019', price: 559000
    },

    {
        productid: 'VY628890', brandid: 'Asia ', img: '../hinhanh/quatdien/fan2.jpg', name: 'Quạt lửng Asia VY628890',
        size: 'Ngang 45cm - Cao 80 - 98cm - Sâu 45cm', power: '75W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2024', price: 510000
    },

    {
        productid: 'VY639990', brandid: 'Asia', img: '../hinhanh/quatdien/fan3.jpg', name: 'Quạt đứng Asia VY639990',
        size: 'Ngang 52cm - Cao 100.5 - 119cm - Sâu 52cm', power: '80W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2022', price: 790000
    },

    {
        productid: 'TC1622', brandid: 'Senko', img: '../hinhanh/quatdien/fan4.jpg', name: 'Quạt treo tường Senko TC1622',
        size: 'Ngang 45cm - Cao 47cm - Sâu 29cm', power: '65W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2017', price: 540000
    },

    {
        productid: 'VY377790', brandid: 'Asia', img: '../hinhanh/quatdien/fan5.jpg', name: 'Quạt treo tường Asia VY377790',
        size: 'Ngang 47cm - Cao 69cm - Sâu 36.5cm', power: '55W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2022', price: 720000
    },

    {
        productid: 'B1612', brandid: 'Senko', img: '../hinhanh/quatdien/fan6.jpg', name: 'Quạt bàn Senko B1612',
        size: 'Ngang 32cm - Cao 65.5cm - Sâu 32cm', power: '47W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2019', price: 425000
    },

    {
        productid: 'L1638', brandid: 'Senko', img: '../hinhanh/quatdien/fan7.jpg', name: 'Quạt lửng Senko L1638',
        size: 'Ngang 36.8cm - Cao 75.6 - 91.5cm - Sâu 36cm', power: '47W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2021', price: 470000
    },

    {
        productid: 'LTS1636', brandid: 'Senko', img: '../hinhanh/quatdien/fan8.jpg', name: 'Quạt lửng Senko LTS1636',
        size: 'Ngang 41cm - Cao 85 - 97cm - Sâu 41cm', power: '65W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2017', price: 560000
    },

    {
        productid: 'VY357690', brandid: 'Asia', img: '../hinhanh/quatdien/fan9.jpg', name: 'Quạt treo tường Asia VY357690',
        size: 'Ngang 44.7cm - Cao 54.5cm - Sâu 33.8cm', power: '55W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2022', price: 550000
    },

    {
        productid: 'VY355790', brandid: 'Asia', img: '../hinhanh/quatdien/fan10.jpg', name: 'Quạt bàn Asia VY355790',
        size: 'Ngang 29cm - Cao 60cm - Sâu 33cm', power: '55W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2022', price: 550000
    },

    {
        productid: 'B1213', brandid: 'Senko', img: '../hinhanh/quatdien/fan11.jpg', name: 'Quạt bàn Senko B1213',
        size: 'Ngang 26.5cm - Cao 54cm - Sâu 27.5cm', power: '40W', brandOf: 'Việt Nam', madein: 'Việt Nam', year: '2019', price: 379000
    },

    {
        productid: 'SHD7115', brandid: 'Sunhouse', img: '../hinhanh/quatdien/fan12.jpg', name: 'Quạt sạc điện Sunhouse SHD7115',
        size: 'Ngang 26cm - Cao 50.5cm - Sâu 26cm', power: '15W', brandOf: 'Việt Nam', madein: 'Trung Quốc', year: '2021', price: 900000
    },

];

let cart = [
    {
        productid: 'DH1600',
        soluong: '1'
    },
    {
        productid: 'B1213',
        soluong: 2
    }
]

document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', function () {
        const quantityElement = this.previousElementSibling;
        let currentQuantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = currentQuantity + 1;

        // Cập nhật giỏ hàng nếu cần
        updateCart();
    });
});

document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', function () {
        const quantityElement = this.nextElementSibling;
        let currentQuantity = parseInt(quantityElement.textContent);

        if (currentQuantity > 1) {
            quantityElement.textContent = currentQuantity - 1;

            // Cập nhật giỏ hàng nếu cần
            updateCart();
        }
    });
});

function updateCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    let totalQuantity = 0;
    let totalPrice = 0;

    cartItems.forEach(item => {
        const quantityElement = item.querySelector('.quantity');
        const price = parseFloat(item.querySelector('.item-price').textContent);
        const quantity = parseInt(quantityElement.textContent);
        const subtotal = price * quantity * 1000;

        // Cập nhật tổng tiền cho từng sản phẩm
        // subtotal = subtotal * 1000;
        item.querySelector('.item-total').textContent = subtotal.toLocaleString('vi-VN') + ' VNĐ';

        // Cộng dồn số lượng và giá
        totalPrice += subtotal;
    });

    // Cập nhật tổng số lượng và tổng giá vào phần tóm tắt giỏ hàng
    document.getElementById('total-price').textContent = totalPrice.toLocaleString('vi-VN') + ' VNĐ';

    // Lưu lại giỏ hàng
    saveCart();
}


function saveCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    let cart = [];

    cartItems.forEach(item => {
        const id = item.dataset.id;
        const quantity = item.querySelector('.quantity').textContent;
        cart.push({ id, quantity });
    });

    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
        const container = document.getElementById('cart-container');
        let s = "";
        cart.forEach(item => {
            s += `<tr class="cart-item">
                            <td><img src="Logo-DH-Sai-Gon-SGU-flat.webp" alt="" style="height: 55px;"></td>
                            <td>
                                Quạt máy senko
                            </td>
                            <td>
                                <p class="item-price">
                                    200.000 VNĐ
                                </p>
                            </td>
                            <td>
                                <div id="chinhsoluong">
                                    <button style="color: gray;" class="decrease">
                                        -
                                    </button>
                                    <p class="quantity">${item.quantity}</p>
                                    <button class="increase">
                                        +
                                    </button>
                                </div>
                            </td>
                            <td>
                                <p class="item-total">
                                    200.000 VNĐ
                                </p>
                            </td>
                            <td>
                                <div id="xoa">
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                            </td>
                        </tr>`
        });
        container.innerHTML += s;
        updateCart();
    }
}

window.onload = loadCart;