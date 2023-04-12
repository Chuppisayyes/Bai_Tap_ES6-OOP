// ================================================================================================================
// HÀM LƯU DỮ LIỆU 
function luuLocalStrage() {
    var stringMangNguoiDung = JSON.stringify(listNguoiDung.danhSachNguoiDung);
    localStorage.setItem('listNguoiDung.danhSachNguoiDung', stringMangNguoiDung);
  }
  // ================================================================================================================
  // HÀM LẤY DỮ LIỆU
  function layStore() {
    if (localStorage.getItem('listNguoiDung.danhSachNguoiDung')) {
      var stringMangNguoiDung = localStorage.getItem('listNguoiDung.danhSachNguoiDung');
      console.log(stringMangNguoiDung);
      //Chuyển dữ string liệu về dạng object
      listNguoiDung.danhSachNguoiDung = JSON.parse(stringMangNguoiDung);
      console.log(listNguoiDung.danhSachNguoiDung);
      //Gọi hàm tạo giao diện từ mảng
      renderTable(listNguoiDung.danhSachNguoiDung);
    }
  }
  layStore();
  // ================================================================================================================
  // HÀM RENDER DỮ LIỆU LÊN GIAO DIỆN
  function renderTable(mangNguoiDung) {
    let HTMlString = '';
    for (let index = 0; index < mangNguoiDung.length; index++) {
      let user = mangNguoiDung[index];
      console.log('Người dùng', user);
      var khacString = '';
      var loaiUser = '';
      if (user.toan) {
        loaiUser = 'Student';
        khacString = `
          <th>
            Điểm Toán:${user.toan} <br/>
            Điểm Lý:${user.ly}  <br/>
            Điểm Hóa:${user.hoa}
          </th>
        `
      } else if (user.soNgayLam) {
        loaiUser = 'Employee';
        khacString = `
          <th>
            Số Ngày Làm: ${user.soNgayLam} <br/>
            Lương Theo Ngày: ${user.luongNgay} vnđ<br/>
          </th>
        `
      } else {
        loaiUser = 'Customer';
        khacString = `
        <th>
          Tên Công ty: ${user.tenCongTy} <br/>
          Trị Giá Hóa Đơn: ${user.triGiaHoaDon} vnđ     <br/>
          Đánh giá: ${user.danhGia}
        </th>
      `
      }
      HTMlString += `
      <tr>
          <th>${user.ma}</th>
          <th>${user.hoTen}</th>
          <th>${user.diaChi}</th>
          <th>${user.email}</th>
          ${khacString}
          <th>
              <button class="btn btn-danger"  onclick="deleteUser('${user.ma}')">Xóa</button>
              <button class="btn btn-success" onclick="updateInfo${loaiUser}('${user.ma}')">Sửa</button>
          </th>
      </tr>
      `;
    }
    document.getElementById("tableDanhSach").innerHTML = HTMlString;
    return HTMlString;
  }
  // ================================================================================================================
  // HÀM XÓA NGƯỜI DÙNG
  window.deleteUser = (ma) => {
    let indexDelete = -1;
    for (let index = 0; index < listNguoiDung.danhSachNguoiDung.length; index++) {
      if (listNguoiDung.danhSachNguoiDung[index].ma === ma) {
        indexDelete = index;
        break;
      }
    }
    listNguoiDung.danhSachNguoiDung.splice(indexDelete, 1);
    renderTable(listNguoiDung.danhSachNguoiDung);
    luuLocalStrage();
  };
  // ================================================================================================================
  // HÀM Clear Form
  function clearFromUser(domIdMainFrom) {
    let arrInput = document.querySelectorAll(`#${domIdMainFrom} .form-group .input-group input`);
    let arrAnnounce = document.querySelectorAll(`#${domIdMainFrom} .sp-thongbao`);
    for (let input of arrInput) {
      input.value = "";
    }
    for (let input of arrAnnounce) {
      input.value = "";
    }
  }
  
  // ================================================================================================================
  // Lấy dữ liệu; Kiểm tra dữ liệu; Thêm người dùng vào mảng; Render ra giao diện, luu dữ liệu người dùng vào LocalStrage; chặn user bị trùng
  // ======== STUDENT ========
  document.querySelector('#btnThemStudentModal').onclick = function () {
    // input: Student
    var nguoiDung = new Student();
    var arrInput = document.querySelectorAll('#mainFormStudent .form-group .input-group input');
    for (let input of arrInput) {
      let { id, value } = input;
      nguoiDung[id] = value;
    }
  console.log(nguoiDung)
    //Validation
    let valid = true;
    /* kiểm tra rỗng */
    valid =
      checked.kiemTraRong(nguoiDung.ma, "error-required-maStudent", "Mã") &
      checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenStudent", "Họ và Tên") &
      checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiStudent", "Địa chỉ") &
      checked.kiemTraRong(nguoiDung.email, "error-required-emailStudent", "Email") &
      checked.kiemTraRong(nguoiDung.toan, "error-required-toan", "Toán") &
      checked.kiemTraRong(nguoiDung.ly, "error-required-ly", "Lý") &
      checked.kiemTraRong(nguoiDung.hoa, "error-required-hoa", "Hóa") &
      /* length */
      checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maStudent", "Mã", 4, 6);
  
    /* kiểm tra user */
    valid = checked.kiemTraTrungUser(nguoiDung.ma, "error-Dup-maStudent",'btnThemStudentModal', listNguoiDung.danhSachNguoiDung);
    if (!valid) {
      return;
    }
    /* định dạng mail */
    valid = checked.kiemTraEmail(nguoiDung.email, "error-emailStudent", "Email");
    if (!valid) {
      return;
    }
    /* kiểu ký tự */
    valid =
      checked.kiemtraSo(nguoiDung.ma, "error-number-maStudent", "Mã") &
      checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenStudent", "Họ tên");
    if (!valid) {
      return;
    }
  
    //thêm người dùng vào mãng trống
    listNguoiDung.addUser(nguoiDung);
    //render ra giao diện
    renderTable(listNguoiDung.danhSachNguoiDung);
    luuLocalStrage();
    document.getElementById("btnDongStudentModal").click();
    clearFromUser('mainFormStudent');
  }
  // ===============================================
  // HÀM Cập Nhật Thông tin
  window.updateInfoStudent = (ma) => {
    document.getElementById("ma").disabled = true;
    document.getElementById("btnThemStudentModal").disabled = true;
    document.getElementById("btnCapNhatStudentModal").disabled = false;
    for (let student of listNguoiDung.danhSachNguoiDung) {
      if (student.ma === ma) {
        document.getElementById("ma").value = student.ma;
        document.getElementById("hoTen").value = student.hoTen;
        document.getElementById("diaChi").value = student.diaChi;
        document.getElementById("email").value = student.email;
        document.getElementById("toan").value = student.toan;
        document.getElementById("ly").value = student.ly;
        document.getElementById("hoa").value = student.hoa;
        break;
      }
    }
    document.getElementById("btnThemStudent").click();
  };
  document.getElementById("btnCapNhatStudentModal").onclick = function () {
    var nguoiDung = new Student();
    var arrInput = document.querySelectorAll('#mainFormStudent .form-group .input-group input');
    for (let input of arrInput) {
      let { id, value } = input;
      nguoiDung[id] = value;
    }
    //Validation
    let valid = true;
    /* kiểm tra rỗng */
    valid =
      checked.kiemTraRong(nguoiDung.ma, "error-required-maStudent", "Mã") &
      checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenStudent", "Họ và Tên") &
      checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiStudent", "Địa chỉ") &
      checked.kiemTraRong(nguoiDung.email, "error-required-emailStudent", "Email") &
      checked.kiemTraRong(nguoiDung.toan, "error-required-toan", "Toán") &
      checked.kiemTraRong(nguoiDung.ly, "error-required-ly", "Lý") &
      checked.kiemTraRong(nguoiDung.hoa, "error-required-hoa", "Hóa") &
      /* length */
      checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maStudent", "Mã", 4, 6);
  
   /* kiểm tra user */
   valid = checked.kiemTraTrungUser(nguoiDung.ma, "error-Dup-maStudent",'btnThemStudentModal', listNguoiDung.danhSachNguoiDung);
   if (!valid) {
     return;
   }
    /* định dạng mail */
    valid = checked.kiemTraEmail(nguoiDung.email, "error-emailStudent", "Email");
    if (!valid) {
      return;
    }
    /* kiểu ký tự */
    valid =
      checked.kiemtraSo(nguoiDung.ma, "error-number-maStudent", "Mã") &
      checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenStudent", "Họ tên");
    if (!valid) {
      return;
    }
    //thêm người dùng vào mãng trống
    listNguoiDung.updateUser(nguoiDung);
    //render ra giao diện
    renderTable(listNguoiDung.danhSachNguoiDung);
  
    document.getElementById("btnDongStudentModal").click();
    document.getElementById("ma").disabled = false;
    document.getElementById("btnThemStudentModal").disabled = false;
    clearFromUser('mainFormStudent');
    luuLocalStrage();
  
  };
  // ================================================================================================================
  // Lấy dữ liệu; Kiểm tra dữ liệu; Thêm người dùng vào mảng; Render ra giao diện, luu dữ liệu người dùng vào LocalStrage; chặn user bị trùng
  // ======== EMPLOYEE ======== 
  
  document.querySelector('#btnThemEmployeeModal').onclick = function () {
    // input: Employee
    var nguoiDung = new Employee();
    var arrInput = document.querySelectorAll('#mainFormEmployee .form-group .input-group input');
    for (let input of arrInput) {
      let { id, value } = input;
      nguoiDung[id] = value;
    }
  
    //Validation
    let valid = true;
    /* kiểm tra rỗng */
    valid =
      checked.kiemTraRong(nguoiDung.ma, "error-required-maEmployee", "Mã") &
      checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenEmployee", "Họ và Tên") &
      checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiEmployee", "Địa chỉ") &
      checked.kiemTraRong(nguoiDung.email, "error-required-emailEmployee", "Email") &
      checked.kiemTraRong(
        nguoiDung.soNgayLam,
        "error-required-soNgayLam",
        "Số ngày làm"
      ) &
      checked.kiemTraRong(
        nguoiDung.luongNgay,
        "error-required-luongNgay",
        "Lương ngày"
      ) &
      /* length */
      checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maEmployee", "Mã", 4, 6);
  
  
    /* kiểm tra user */
    valid = checked.kiemTraTrungUser(nguoiDung.ma, "error-Dup-maEmployee","btnThemEmployeeModal", listNguoiDung.danhSachNguoiDung);
    if (!valid) {
      return;
    }
    /* định dạng mail */
    valid = checked.kiemTraEmail(nguoiDung.email, "error-emailEmployee", "Email");
    if (!valid) {
      return;
    }
  
    /* kiểu ký tự */
    valid =
      checked.kiemtraSo(nguoiDung.ma, "error-number-maEmployee", "Mã") &
      checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenEmployee", "Họ tên");
    if (!valid) {
      return;
    }
    //thêm người dùng vào mãng trống
    listNguoiDung.addUser(nguoiDung);
    //render ra giao diện
    renderTable(listNguoiDung.danhSachNguoiDung);
    document.getElementById("btnDongEmployeeModal").click();
    luuLocalStrage();
    clearFromUser('mainFormEmployee');
  
  }
  
  // ===============================================
  // HÀM Cập Nhật Thông tin
  window.updateInfoEmployee = (ma) => {
    document.getElementById("ma").disabled = true;
    document.getElementById("btnThemEmployeeModal").disabled = true;
    document.getElementById("btnCapNhatEmployeeModal").disabled = false;
    for (let employee of listNguoiDung.danhSachNguoiDung) {
      if (employee.ma === ma) {
        document.getElementById("ma").value = employee.ma;
        document.getElementById("hoTen").value = employee.hoTen;
        document.getElementById("diaChi").value = employee.diaChi;
        document.getElementById("email").value = employee.email;
        document.getElementById("soNgayLam").value = employee.soNgayLam;
        document.getElementById("luongNgay").value = employee.luongNgay;
        break;
      }
    }
    document.getElementById("btnThemEmployee").click();
  };
  document.getElementById("btnCapNhatEmployeeModal").onclick = function () {
    var nguoiDung = new Employee();
    var arrInput = document.querySelectorAll('#mainFormEmployee .form-group .input-group input');
    for (let input of arrInput) {
      let { id, value } = input;
      nguoiDung[id] = value;
    }
    //Validation
    let valid = true;
    /* kiểm tra rỗng */
    valid =
      checked.kiemTraRong(nguoiDung.ma, "error-required-maEmployee", "Mã") &
      checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenEmployee", "Họ và Tên") &
      checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiEmployee", "Địa chỉ") &
      checked.kiemTraRong(nguoiDung.email, "error-required-emailEmployee", "Email") &
      checked.kiemTraRong(
        nguoiDung.soNgayLam,
        "error-required-soNgayLam",
        "Số ngày làm"
      ) &
      checked.kiemTraRong(
        nguoiDung.luongNgay,
        "error-required-luongNgay",
        "Lương ngày"
      ) &
      /* length */
      checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maEmployee", "Mã", 4, 6);
   /* kiểm tra user */
   valid = checked.kiemTraTrungUser(nguoiDung.ma, "error-Dup-maEmployee","btnThemEmployeeModal", listNguoiDung.danhSachNguoiDung);
   if (!valid) {
     return;
   }
    /* định dạng mail */
    valid = checked.kiemTraEmail(nguoiDung.email, "error-emailEmployee", "Email");
    if (!valid) {
      return;
    }
  
    /* kiểu ký tự */
    valid =
      checked.kiemtraSo(nguoiDung.ma, "error-number-maEmployee", "Mã") &
      checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenEmployee", "Họ tên");
    if (!valid) {
      return;
    }
    //thêm người dùng vào mãng trống
    listNguoiDung.updateUser(nguoiDung);
    //render ra giao diện
    renderTable(listNguoiDung.danhSachNguoiDung);
  
    document.getElementById("btnDongEmployeeModal").click();
    document.getElementById("ma").disabled = false;
    document.getElementById("btnThemEmployeeModal").disabled = false;
    clearFromUser('mainFormEmployee');
    luuLocalStrage();
  
  };
  // ================================================================================================================
  // Lấy dữ liệu; Kiểm tra dữ liệu; Thêm người dùng vào mảng; Render ra giao diện, luu dữ liệu người dùng vào LocalStrage; chặn user bị trùng
  // ======== CUSTOMER ======== 
  document.querySelector('#btnThemCustomerModal').onclick = function () {
    // input: Customer
    var nguoiDung = new Customer();
    var arrInput = document.querySelectorAll('#mainFormCustomer .form-group .input-group input');
    for (let input of arrInput) {
      let { id, value } = input;
      nguoiDung[id] = value;
    }
    //Validation
    let valid = true;
    /* kiểm tra rỗng */
    valid =
      checked.kiemTraRong(nguoiDung.ma, "error-required-maCustomer", "Mã") &
      checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenCustomer", "Họ và Tên") &
      checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiCustomer", "Địa chỉ") &
      checked.kiemTraRong(nguoiDung.email, "error-required-emailCustomer", "Email") &
      checked.kiemTraRong(
        nguoiDung.tenCongTy,
        "error-required-soNgayLam",
        "Tên công ty"
      ) &
      checked.kiemTraRong(
        nguoiDung.triGiaHoaDon,
        "error-required-triGiaHoaDon",
        "Trị giá hoán đổi"
      ) &
      checked.kiemTraRong(nguoiDung.danhGia, "error-required-danhGia", "Đánh giá") &
      /* length */
      checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maCustomer", "Mã", 4, 6);
  
    /* kiểm tra user */
    valid = checked.kiemTraTrungUser(nguoiDung.ma, "error-Dup-maCustomer","btnThemCustomerModal", listNguoiDung.danhSachNguoiDung);
    if (!valid) {
      return;
    }
    /* định dạng mail */
    valid = checked.kiemTraEmail(nguoiDung.email, "error-emailCustomer", "Email");
    if (!valid) {
      return;
    }
  
    /* kiểu ký tự */
    valid =
      checked.kiemtraSo(nguoiDung.ma, "error-number-maCustomer", "Mã") &
      checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenCustomer", "Họ tên");
    if (!valid) {
      return;
    }
    //thêm người dùng vào mãng trống
    listNguoiDung.addUser(nguoiDung);
    //render ra giao diện
    renderTable(listNguoiDung.danhSachNguoiDung);
    document.getElementById("btnDongCustomerModal").click();
    luuLocalStrage();
    clearFromUser('mainFormCustomer');
  }
  // ===============================================
  // HÀM Cập Nhật Thông tin
  window.updateInfoCustomer = (ma) => {
    document.getElementById("ma").disabled = true;
    document.getElementById("btnThemCustomerModal").disabled = true;
    document.getElementById("btnCapNhatCustomerModal").disabled = false;
    for (let customer of listNguoiDung.danhSachNguoiDung) {
      if (customer.ma === ma) {
        document.getElementById("ma").value = customer.ma;
        document.getElementById("hoTen").value = customer.hoTen;
        document.getElementById("diaChi").value = customer.diaChi;
        document.getElementById("email").value = customer.email;
        document.getElementById("tenCongTy").value = customer.tenCongTy;
        document.getElementById("triGiaHoaDon").value = customer.triGiaHoaDon;
        document.getElementById("danhGia").value = customer.danhGia;
        break;
      }
    }
    document.getElementById("btnThemCustomer").click();
  };
  document.getElementById("btnCapNhatCustomerModal").onclick = function () {
    var nguoiDung = new Customer();
    var arrInput = document.querySelectorAll('#mainFormCustomer .form-group .input-group input');
    for (let input of arrInput) {
      let { id, value } = input;
      nguoiDung[id] = value;
    }
    //Validation
    let valid = true;
    /* kiểm tra rỗng */
    valid =
      checked.kiemTraRong(nguoiDung.ma, "error-required-maCustomer", "Mã") &
      checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenCustomer", "Họ và Tên") &
      checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiCustomer", "Địa chỉ") &
      checked.kiemTraRong(nguoiDung.email, "error-required-emailCustomer", "Email") &
      checked.kiemTraRong(
        nguoiDung.tenCongTy,
        "error-required-soNgayLam",
        "Tên công ty"
      ) &
      checked.kiemTraRong(
        nguoiDung.triGiaHoaDon,
        "error-required-triGiaHoaDon",
        "Trị giá hoán đổi"
      ) &
      checked.kiemTraRong(nguoiDung.danhGia, "error-required-danhGia", "Đánh giá") &
      /* length */
      checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maCustomer", "Mã", 4, 6);
    
    
    /* kiểm tra user */
    valid = checked.kiemTraTrungUser(nguoiDung.ma, "error-Dup-maCustomer","btnThemCustomerModal", listNguoiDung.danhSachNguoiDung);
    if (!valid) {
      return;
    }
    /* định dạng mail */
    valid = checked.kiemTraEmail(nguoiDung.email, "error-emailCustomer", "Email");
    if (!valid) {
      return;
    }
  
    /* kiểu ký tự */
    valid =
      checked.kiemtraSo(nguoiDung.ma, "error-number-maCustomer", "Mã") &
      checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenCustomer", "Họ tên");
    if (!valid) {
      return;
    }
    //thêm người dùng vào mãng trống
    listNguoiDung.updateUser(nguoiDung);
    //render ra giao diện
    renderTable(listNguoiDung.danhSachNguoiDung);
  
    document.getElementById("btnDongCustomerModal").click();
    document.getElementById("ma").disabled = false;
    document.getElementById("btnThemCustomerModal").disabled = false;
    clearFromUser('mainFormCustomer');
    luuLocalStrage();
  
  };
  
  
  