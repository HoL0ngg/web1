// Kiểm tra trạng thái đăng nhập
// let isLogin = false;
let userlogin = undefined;

// Tài khoản admin
let adminArr = [
    {
        username: 'admin1',
        password: 'hihi'
    },
    {
        username: 'admin',
        password: 'admin'
    }
]

const openSignIn = document.getElementById('icon--user');
const goToSignUp = document.getElementById('GoToSignUp');
const signUpBackToSignIn = document.getElementById('SignUpBackToSignIn');
const closeFormLogin = document.getElementById('CloseFormLogin');
const signInContainer = document.querySelector('.sign-in-container');
const signUpContainer = document.querySelector('.sign-up-container');
const signInForm = signInContainer.querySelector('form');
const signUpForm = signUpContainer.querySelector('form');
const nameUser = document.getElementById('user--name');
const iconUser = document.getElementById('topmenu_icon--user');
const loginContainer = document.getElementById('container-login');
const adminContainer = document.getElementById('topmenu_icon--gear');

// window.onload = checklogin;
checklogin();

function checklogin() {
    hideAdmin();
    const user = JSON.parse(localStorage.getItem('userlogin'));
    if (user == null) return;

    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    // kieemr tra
    userlogin = accounts.find(account => account.username === user.username);
    if (userlogin) {
        // showAlert("Đăng nhập thành công!");
        isLogin = true;
        // hideLogin();
        hideUser();
        showNameUser();
        nameUser.innerText = userlogin.username;
        return;
    }
    userlogin = adminArr.find(admin => admin.username == user.username && admin.password == user.password)
    if (userlogin) {

        // showAlert("Đăng nhập thành công với tài khoản admin!");
        isLogin = true;
        // hideLogin();
        hideUser();
        showAdmin();
        nameUser.innerText = userlogin.username;
        showNameUser();
        // userNameElement.style.display = 'flex';
    }
}

// Hiển thị hộp thoại
function showAlert(message) {
    alert(message);
}

// Hàm lưu tài khoản vào localStorage
function saveAccount(username, numberphone, password) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    accounts.push({ username, numberphone, password });
    localStorage.setItem("accounts", JSON.stringify(accounts));
}

// Check tài khoản đã tồn tại hay chưa?
function checkAccount(username) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    // Kiểm tra
    return accounts.find(account => account.username === username);
}

//Hàm lưu tài khoản bị Block vào localstorage
function blackListAccount(numberphone, username) {
    const blackAccounts = JSON.parse(localStorage.getItem("blackAccounts")) || [];
    blackAccounts.push({ numberphone, username });
    localStorage.setItem("blackAccounts", JSON.stringify(blackAccounts));
}

// Hàm gỡ tài khoản khỏi blacklist
function removeFromBlackList(usernameOrPhone) {
    const blackAccounts = JSON.parse(localStorage.getItem("blackAccounts")) || [];
    const updatedBlackAccounts = blackAccounts.filter(account =>
        account.username !== usernameOrPhone && account.numberphone !== usernameOrPhone
    );
    localStorage.setItem("blackAccounts", JSON.stringify(updatedBlackAccounts));
}

//Hàm check tài khoản có bị Block hay khôgn?
function isBlackList(numberphoneOrUsername) {
    const blackAccounts = JSON.parse(localStorage.getItem("blackAccounts")) || [];

    // Kiểm tra
    return blackAccounts.some(account =>
        account.numberphone === numberphoneOrUsername || account.username === numberphoneOrUsername
    );
}

// Hàm tìm tài khoản trong localStorage
function findAccount(numberphoneOrUsername, password) {
    const accounts = JSON.parse(localStorage.getItem("accounts")) || [];
    // kieemr tra
    return accounts.find(account =>
        (account.numberphone === numberphoneOrUsername || account.username === numberphoneOrUsername) &&
        account.password === password
    );
}

document.querySelectorAll('.logout').forEach(logoutbtn => {
    logoutbtn.addEventListener('click', function () {
        console.log('hehe');

        logout();
    })
})

function hideUserSelection() {
    document.querySelectorAll('.user--selection').forEach(selection => {
        selection.classList.add('hidden');
    })
}

// Hàm đăng xuất tài khoản
function logout() {
    isLogin = false;
    userlogin = undefined;
    hideAdmin();
    hideNameUser();
    hideUserSelection();
    showUser();
    document.getElementById('dangnhap-form').reset();
    document.getElementById('dangky-form').reset();
    document.getElementById('personal-form').reset();
    if (document.getElementById('payment-form')) document.getElementById('payment-form').reset();
    document.querySelectorAll('.payment-input').forEach(inp => inp.classList.remove('valid'));
    document.querySelectorAll('.payment-input').forEach(inp => inp.classList.remove('invalid'));
    localStorage.removeItem('userlogin');
    updateUser();
    // showAlert("Bạn đã đăng xuất thành công.");
}
// ----------------------------------------------------------------------------------------------------------------------//

//Hàm ấn icon user
function hideUser() {
    iconUser.classList.add('hidden');
}
// Hàm hiện icon user
function showUser() {
    iconUser.classList.remove('hidden');
}

// ham an name user
function hideNameUser() {
    nameUser.style.display = 'none';
}
//ham hien name user
function showNameUser() {
    nameUser.style.display = 'block';
}

nameUser.addEventListener('click', function (e) {
    userSelection[0].classList.toggle('hidden');
});

// Hàm hiển thị cửa sổ Login
function showLogin() {
    loginContainer.style.display = 'block';
}
// Hàm ẩn Login
function hideLogin() {
    loginContainer.style.display = 'none';
}

// Hiển thị 
function showAdmin() {
    adminContainer.style.display = 'block';
}
// Ẩn nút chuyển tới trang Admin
function hideAdmin() {
    adminContainer.style.display = 'none';
}

const userSelection = document.querySelectorAll('.user--selection');

userSelection.forEach(select => {
    select.addEventListener('click', (e) => e.stopPropagation());
})

//mở trang đăng nhập
openSignIn.addEventListener('click', (e) => {
    console.log('hihi');
    console.log(userSelection);

    if (userlogin == undefined && openSignIn.contains(e.target)) {
        showLogin();
    }
    else {
        // show thông tin để chọn
        userSelection[1].classList.toggle('hidden');
    }
});
// Chuyển sang form đăng kí
goToSignUp.addEventListener('click', (e) => {
    e.preventDefault();
    signInContainer.style.display = 'none';
    signUpContainer.style.display = 'flex';
});
// Trở về form đăng nhập từ form đăng kí
signUpBackToSignIn.addEventListener('click', (e) => {
    e.preventDefault();
    signUpContainer.style.display = 'none';
    signInContainer.style.display = 'flex';
});
// Đóng form login
closeFormLogin.addEventListener('click', (e) => {
    e.preventDefault();
    hideLogin();
});

// -------------------------------------------------------------------------------------//

// Kiểm tra đăng kí tài khoản
signUpForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = signUpForm.querySelector("input[placeholder='Tên tài khoản']").value;
    const numberphone = signUpForm.querySelector("input[placeholder='Số điện thoại']").value;
    const password = signUpForm.querySelector("input[placeholder='Mật khẩu']").value;
    const confirmPassword = signUpForm.querySelector("input[placeholder='Nhập lại mật khẩu']").value;


    if (checkAccount(username)) {
        showAlert("Tài khoản đã tồn tại");
        return;
    }

    if (isBlackList(username) || isBlackList(numberphone)) {
        showAlert("Tài khoản này đã bị chặn và không thể đăng kí. Vui lòng liên hệ Người Quản Trị để giải quyết");
        return;
    }

    if (username.length < 6 || username.length > 10) {
        showAlert("Tên tài khoản phải từ 6 đến 10 ký tự.");
        return;
    }

    if (password.length < 6 || password.length > 20) {
        showAlert("Mật khẩu phải từ 6 đến 20 ký tự.");
        return;
    }

    if (password !== confirmPassword) {
        showAlert("Mật khẩu nhập lại không khớp.");
        return;
    }

    saveAccount(username, numberphone, password);
    showAlert("Đăng kí thành công! Bạn có thể đăng nhập bằng tài khoản mới.");
    signUpContainer.style.display = 'none';
    signInContainer.style.display = 'flex';
});

// Kiểm tra đăng nhập
signInForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const numberphoneOrUsername = signInForm.querySelector("input[placeholder='Số điện thoại hoặc Tên tài khoản']").value;
    const password = signInForm.querySelector("input[placeholder='Mật khẩu']").value;

    if (isBlackList(numberphoneOrUsername)) {
        showAlert("Tài khoản này đã bị chặn và không thể đăng nhập. Vui lòng liên hệ Người Quản Trị để giải quyết");
        return;
    }

    if (adminArr.find(admin => admin.username == numberphoneOrUsername && admin.password == password)) {
        showAlert("Đăng nhập thành công với tài khoản admin!");
        isLogin = true;
        hideLogin();
        hideUser();
        showAdmin();
        nameUser.textContent = 'admin';
        userlogin = adminArr.find(admin => admin.username == numberphoneOrUsername);
        showNameUser();
        localStorage.setItem('userlogin', JSON.stringify(userlogin));
        // userNameElement.style.display = 'flex';
    }
    else if (findAccount(numberphoneOrUsername, password)) {
        showAlert("Đăng nhập thành công!");
        isLogin = true;
        hideLogin();
        hideUser();
        nameUser.textContent = numberphoneOrUsername;
        userlogin = findAccount(numberphoneOrUsername, password);
        updatePersonalForm();
        updateUser();
        showNameUser();
        localStorage.setItem('userlogin', JSON.stringify(userlogin));

    } else {
        showAlert("Số điện thoại, tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
});

// blackListAccount("0123456789","a12345");

function updatePersonalForm() {
    const userInfoArray = JSON.parse(localStorage.getItem('userInfo')) || [];
    console.log(userlogin);

    let hihi = userInfoArray.find(user => user.username == userlogin.username);

    // Không tìm thấy
    if (hihi == undefined) return false;

    document.getElementById('namePersonal').value = hihi.hoten;
    document.getElementById('emailPersonal').value = hihi.email;
    document.getElementById('phonePersonal').value = hihi.sdt;
    document.getElementById('addressPersonal').value = hihi.diachi;
    return true;
}

function closePersonalInfoTable() {
    const displayPersonalInfo = document.getElementById("display-personal-info");
    displayPersonalInfo.style.display = 'none';

}

function openPersonalInfoTable() {
    const displayPersonalInfo = document.getElementById("display-personal-info");
    if (updatePersonalForm()) {
        // document.querySelectorAll('.payment-input');
        const hehe = document.querySelectorAll('.payment-input');
        for (let i = 0; i < 4; ++i) {
            hehe[i].classList.add('valid');
        }
    }
    displayPersonalInfo.style.display = 'block';
    displayPersonalInfo.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
}

document.querySelectorAll('.user-information').forEach(element => {
    element.addEventListener('click', openPersonalInfoTable)
});

document.getElementById('display-personal-info').addEventListener('submit', function (e) {
    e.preventDefault();
})

if (document.getElementById('personal-form')) document.getElementById('personal-form').addEventListener('submit', function (e) {
    e.preventDefault();
    let flag = true;
    flag &= checkName(document.getElementById('namePersonal'));
    flag &= checkEmail(document.getElementById('emailPersonal'));
    flag &= checkSDT(document.getElementById('phonePersonal'));
    flag &= checkDiaChi(document.getElementById('addressPersonal'));
    // console.log(flag);
    if (flag) {
        const userInfoArray = JSON.parse(localStorage.getItem('userInfo')) || [];
        let userInfo = {
            username: userlogin.username,
            hoten: document.getElementById('namePersonal').value,
            email: document.getElementById('emailPersonal').value,
            sdt: document.getElementById('phonePersonal').value,
            diachi: document.getElementById('addressPersonal').value
        }
        let index = userInfoArray.findIndex(user => user.username == userInfo.username);
        if (index == -1)
            userInfoArray.push(userInfo);
        else
            userInfoArray[index] = userInfo;

        localStorage.setItem('userInfo', JSON.stringify(userInfoArray));
        // user.sothe = true;
        updateUser();
        closePersonalInfoTable();
    }
})

// Phần này ai rảnh làm dùm đi ;v
function changePassword() {
    // 1. Lấy dữ liệu từ localStorage
    const accounts = JSON.parse(localStorage.getItem('accounts')) || [];

    // 2. Tìm account cần thay đổi
    const accountIndex = accounts.findIndex(acc => acc.username === userlogin.username);

    // Cho nhập lại password để kiểm tra


    //Kiểm tra hoàn tất thì hiện 1 ô để nhập password mới và xác nhận

    // 3. Cập nhật password
    accounts[accountIndex].password = newPassword;

    // 4. Lưu lại vào localStorage
    localStorage.setItem('accounts', JSON.stringify(accounts));

    console.log('Password changed successfully!');

}