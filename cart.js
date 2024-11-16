const payment = document.getElementById('payment-method');
const payment_popup = document.getElementById('payment-method-popup');
let icon_active = null;

window.onload = loadCart;

function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const container = document.getElementById('cart-container');
    let s = '';
    if (cart) {
        s = `<tr>
                            <th></th>
                            <th>Tên sản phẩm</th>
                            <th>Đơn giá</th>
                            <th>Số lượng</th>
                            <th>Tổng</th>
                            <th></th>
                        </tr>`;
        cart.forEach(item => {
            s += `<tr class="cart-item">
                            <td style="display: none;">${item.id}</td>
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
                                <div class="xoa">
                                    <i class="fa-solid fa-xmark"></i>
                                </div>
                            </td>
                        </tr>`
        });
    }
    container.innerHTML = s;
    updateCart();
    EventListener();
    checkEmptyCart();
}

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

    if (icon_active.classList.contains('fa-money-bill-1-wave')) return;

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

function ThanhToan() {
    if (!icon_active) return displayToast('Bạn phải chọn phương thức thanh toán trước');
    if (totalQuantity == 0) return displayToast('Giỏ hàng của bạn đang trống');
    if (icon_active) {
        LuuHoaDon();
        displayToast('Bạn đã đặt hàng thành công');
    }
}

function TaoMaHD() {
    let hoadon = JSON.parse(localStorage.getItem('hoadon')) || [];

    return 'HD' + hoadon.length;
}

function LuuHoaDon() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const HoaDon = {
        id: TaoMaHD(), // ID hóa đơn duy nhất
        items: cart,             // Sản phẩm trong giỏ hàng
        total: totalPrice, // Tổng tiền
        payment_method: icon_active,
        date: new Date().toLocaleString() // Ngày tạo hóa đơn
    };

    let hoadon = JSON.parse(localStorage.getItem('hoadon')) || [];
    hoadon.push(HoaDon);
    localStorage.setItem('hoadon', JSON.stringify(hoadon));
    localStorage.removeItem('cart'); // Xóa giỏ hàng sau khi lưu
    console.log(cart);

    document.querySelectorAll('.payment-icon').forEach(icon => icon.classList.remove('active'));
    loadCart(); // Cập nhật giao diện giỏ hàng

}

function displayToast(msg) {
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    const toastmsg = document.getElementById('toast-msg');
    toastmsg.innerText = msg;
    setTimeout(() => {
        toast.style.display = 'none';
    }, 2900);
}

function EventListener() {
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

    document.querySelectorAll('.xoa').forEach(btn => {
        btn.addEventListener('click', function () {
            const parentElement = this.parentElement.parentElement;
            const maSanPham = parentElement.firstElementChild.textContent;

            parentElement.remove();
            removeFromCart(maSanPham);
            updateCart();
        })
    });
}

// Hàm xóa sản phẩm khỏi localStorage
function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== id); // Lọc bỏ sản phẩm có id tương ứng
    localStorage.setItem('cart', JSON.stringify(cart)); // Lưu lại giỏ hàng mới
    // updateCart();
    loadCart();

    checkEmptyCart();
}

function saveCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    let cart = [];

    cartItems.forEach(item => {
        const id = item.firstElementChild.textContent;
        const quantity = item.querySelector('.quantity').textContent;
        cart.push({ id, quantity });
    });

    localStorage.setItem('cart', JSON.stringify(cart));
}

let totalQuantity = 0;
let totalPrice = 0;

function updateCart() {
    const cartItems = document.querySelectorAll('.cart-item');
    totalPrice = 0;
    totalQuantity = 0;
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
        totalQuantity += quantity;
    });

    // Cập nhật tổng số lượng và tổng giá vào phần tóm tắt giỏ hàng
    document.getElementById('total-price').textContent = totalPrice.toLocaleString('vi-VN') + ' VNĐ';

    // Lưu lại giỏ hàng
    saveCart();
}

function checkEmptyCart() {
    // console.log(totalQuantity);

    if (totalQuantity == 0) {
        document.getElementById('empty-cart').style.display = 'block';
        document.getElementsByClassName('container')[0].style.display = 'none';
    } else {
        document.getElementById('empty-cart').style.display = 'none';
        document.getElementsByClassName('container')[0].style.display = 'block';
    }
}