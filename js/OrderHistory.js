
// function displayOrders() {
//     const ordersTable = document.getElementById('orders-table-body'); // Thân bảng để hiển thị
//     ordersTable.innerHTML = ''; // Xóa nội dung cũ

//     // Lấy dữ liệu từ `hoadon` trong localStorage
//     const hoadons = JSON.parse(localStorage.getItem('hoadon')) || [];

//     // Duyệt qua từng hóa đơn và thêm vào bảng
//     hoadons.forEach(order => {
//         const row = document.createElement('tr');

//         // Thêm hàng vào bảng
//         row.innerHTML = `
//             <td>${order.id}</td> <!-- Mã đơn hàng -->
//             <td>${order.date}</td> <!-- Ngày đặt hàng -->
//             <td>${order.items}</td> 
//              <td>${order.address}</td> <!-- Có thể thay thế bằng dữ liệu thực -->
//             <td>${order.trangthai ? 'Đã xử lý' : 'Chưa xử lý'}</td> <!-- Trạng thái -->

//             <td>${order.total}</td> <!-- Tổng tiền -->
//         `;

//         ordersTable.appendChild(row);
//     });
// }

// // Hiển thị dữ liệu khi tải trang
// document.addEventListener('DOMContentLoaded', displayOrders);
function displayOrders() {
    const ordersTable = document.getElementById('orders-table-body'); // Thân bảng để hiển thị
    ordersTable.innerHTML = ''; // Xóa nội dung cũ

    // Lấy dữ liệu từ `hoadon` và `userInfo` trong localStorage
    const hoadons = JSON.parse(localStorage.getItem('hoadon')) || [];
    const userInfoArray = JSON.parse(localStorage.getItem('userInfo')) || [];

    // Duyệt qua từng hóa đơn và thêm vào bảng
    hoadons.forEach(order => {
        const row = document.createElement('tr');

        // Tìm thông tin người dùng từ `userInfo` dựa trên username
        let user = userInfoArray.find(user => user.username == order.user.username);
        let userAddress = user ? user.diachi : 'Không có địa chỉ'; // Nếu không tìm thấy, dùng giá trị mặc định

        // Thêm hàng vào bảng
        row.innerHTML = `
            <td>${order.id}</td> <!-- Mã đơn hàng -->
            <td>${order.date}</td> <!-- Ngày đặt hàng -->
            <td>${order.total}</td> <!-- Tổng tiền -->
            <td>${order.items.map(item => `${item.id} (x${item.quantity})`).join(', ')}</td> <!-- Các sản phẩm trong đơn hàng -->
            <td>${order.diachi}</td> <!-- Địa chỉ lấy từ userInfo -->
            <td>${order.trangthai ? 'Đã xử lý' : 'Chưa xử lý'}</td> <!-- Trạng thái -->
            
        `;

        ordersTable.appendChild(row);
    });
}

window.onload = function () {
    updateQuantity();
}


// Hiển thị dữ liệu khi tải trang
document.addEventListener('DOMContentLoaded', displayOrders);
