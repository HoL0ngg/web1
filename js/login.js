// Kiểm tra trạng thái đăng nhập
let isLogin = false;

// Tài khoản admin
const adminAccount = "admin";
const adminPassword = "admin";

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
    return accounts.some(account => account.username === username);
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
    return accounts.some(account =>
        (account.numberphone === numberphoneOrUsername || account.username === numberphoneOrUsername) &&
        account.password === password
    );
}

// Hàm đăng xuất tài khoản
function logout() {
    isLogin = false;
    localStorage.removeItem("accounts");
    hideAdmin();
    hideNameUser();
    showUser();
    showAlert("Bạn đã đăng xuất thành công.");
}
// ----------------------------------------------------------------------------------------------------------------------//



const iconUser = document.getElementById('icon--user');

//Hàm ấn icon user
function hideUser() {
    iconUser.style.display = 'none';
}
// Hàm hiện icon user
function showUser() {
    iconUser.style.display = 'flex';
}

const nameUser = document.getElementById('user--name');
if (nameUser) nameUser.style.display = 'none';
// ham an name user
function hideNameUser() {
    nameUser.style.display = 'none';
}
//ham hien name user
function showNameUser() {
    nameUser.style.display = 'flex';
}

const logoutButton = document.getElementById('logout--button');
if (logoutButton) logoutButton.style.display = 'none';
//ham an nut logout
function hideLogoutButton() {
    logoutButton.style.display = 'none';
}
//ham hien nut logout
function showLogoutButton() {
    logoutButton.style.display = 'none';
}

const loginContainer = document.getElementById('container-login');
// Hàm hiển thị cửa sổ Login
function showLogin() {
    loginContainer.style.display = 'block';
}
// Hàm ẩn Login
function hideLogin() {
    loginContainer.style.display = 'none';
}


const adminContainer = document.getElementById('topmenu_icon--gear');
adminContainer.style.display = 'none';
// Hiển thị 
function showAdmin() {
    adminContainer.style.display = 'flex';
}
// Ẩn nút chuyển tới trang Admin
function hideAdmin() {
    adminContainer.style.display = 'none';
}


const openSignIn = document.getElementById('topmenu_icon--user');
const goToSignUp = document.getElementById('GoToSignUp');
const signUpBackToSignIn = document.getElementById('SignUpBackToSignIn');
const closeFormLogin = document.getElementById('CloseFormLogin');
const signInContainer = document.querySelector('.sign-in-container');
const signUpContainer = document.querySelector('.sign-up-container');
const signInForm = signInContainer.querySelector('form');
const signUpForm = signUpContainer.querySelector('form');
// const nameUser = document.getElementById('user--name');
//mở trang đăng nhập
openSignIn.addEventListener('click', (e) => {
    showLogin();
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


// const logoutButton = document.getElementById('logout--button');
// const nameUser = document.getElementById('user--name');
// Hiện nút logout khi click vào username
if (nameUser) nameUser.addEventListener('click', () => {
    if (logoutButton.style.display === 'none' || !logoutButton.style.display) {
        logoutButton.style.display = 'block';
    } else {
        logoutButton.style.display = 'none';
    }
});

// Ẩn nút logout khi click ra ngoài
document.addEventListener('click', (event) => {
    if (!nameUser.contains(event.target) && !logoutButton.contains(event.target)) {
        logoutButton.style.display = 'none';
    }
});

// click vao nut dang xuat
// const logoutButton = document.getElementById('logout--button');
if (logoutButton) logoutButton.addEventListener('click', () => {
    logout();
    logoutButton.style.display = 'none';
    userNameElement.textContent = '';
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

    if ((numberphoneOrUsername === adminAccount) && (password === adminPassword)) {
        showAlert("Đăng nhập thành công với tài khoản admin!");
        isLogin = true;
        hideLogin();
        hideUser();
        showAdmin();
        nameUser.textContent = 'admin';
        showNameUser();
        userNameElement.style.display = 'flex';
    }
    else if (findAccount(numberphoneOrUsername, password)) {
        showAlert("Đăng nhập thành công!");
        isLogin = true;
        hideLogin();
        hideUser();
        nameUser.textContent = numberphoneOrUsername;
        showNameUser();


    } else {
        showAlert("Số điện thoại, tên tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.");
    }
});

// blackListAccount("0123456789","a12345");

