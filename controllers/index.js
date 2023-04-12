import Validation from "../util/Validation.js";
import ListPerson from "../models/ListPerson.js";
import { Student, Employee, Customer } from "../models/Person.js";
let listNguoiDung = new ListPerson();
var checked = new Validation();

layStore();
// ================================================================================================================
// HÀM XẮP XẾP THỨ TỰ TĂNG DẦN
document.querySelector("#btnListUp").onclick = () => {
  document.querySelector("#btnListUp").style.display = "none";
  document.querySelector("#btnListDown").style.display = "inline";
  const newList = listNguoiDung.sortUser(listNguoiDung.danhSachNguoiDung, 1);
  renderTable(newList);
  luuLocalStrage();

};
// ================================================================================================================
// HÀM XẮP XẾP THỨ TỰ GIẢM DẦN
document.querySelector("#btnListDown").onclick = () => {
  document.querySelector("#btnListUp").style.display = "inline";
  document.querySelector("#btnListDown").style.display = "none";
  const newList = listNguoiDung.sortUser(listNguoiDung.danhSachNguoiDung, -1);
  renderTable(newList);
  luuLocalStrage();
};
// ================================================================================================================
// HÀM XẮP LỌC NGƯỜI DÙNG
document.querySelector("#timNV").onchange = (e) => {
  const newList = listNguoiDung.filterUser(e.target.value);
  renderTable(newList);
  luuLocalStrage();
};

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
            Điểm Hóa:${user.hoa} <br/>
          </th>
        `
      } else if (user.soNgayLam) {
        loaiUser = 'Employee';
        khacString = `
          <th>
            Số Ngày Làm: ${user.soNgayLam} <br/>
            Lương Theo Ngày: ${user.luongNgay} vnđ <br/>
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

// ==========================================================================================
// ========== STUDENT ==========
document.querySelector("#btnThemStudentModal").onclick = () => {
  // input: student
  let nguoiDung = new Student();

  //get Value
  nguoiDung.ma = document.querySelector("#maStudent").value;
  nguoiDung.hoTen = document.querySelector("#hoTenStudent").value;
  nguoiDung.diaChi = document.querySelector("#diaChiStudent").value;
  nguoiDung.email = document.querySelector("#emailStudent").value;
  nguoiDung.toan = document.querySelector("#toan").value;
  nguoiDung.ly = document.querySelector("#ly").value;
  nguoiDung.hoa = document.querySelector("#hoa").value;
  nguoiDung.dtb = (Number(nguoiDung.toan)+Number(nguoiDung.hoa)+Number(nguoiDung.ly))/3;

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

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nguoiDung.ma, "error-number-maStudent", "Mã") &
    checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenStudent", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nguoiDung.email, "error-emailStudent", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNguoiDung.addUser(nguoiDung);

  //xuất ra giao diện
  renderTable(listNguoiDung.danhSachNguoiDung);
  luuLocalStrage();
  document.getElementById("btnDongStudentModal").click();
  clearFormStudent();
};
// ================================================================================
// ========== Hàm chặn User bị trùng ================
document.getElementById("maStudent").oninput = () => {
  for (let index = 0; index < listNguoiDung.danhSachNguoiDung.length; index++) {
    if (
      listNguoiDung.danhSachNguoiDung[index].ma == document.getElementById("maStudent").value
    ) {
      document.getElementById("error-Dup-maStudent").innerHTML = `Tài khoản đã tồn tại`;
      document.getElementById("btnThemStudentModal").disabled = true;
      break;
    } else {
      document.getElementById("error-Dup-maStudent").innerHTML = "";
      document.getElementById("btnThemStudentModal").disabled = false;
    }
  }
};
// ================================================================================
// ============= Hàm Cập Nhật thông tin Student ================
//cập nhật thông tin
window.updateInfoStudent = (ma) => {
  document.getElementById("maStudent").disabled = true;
  document.getElementById("btnThemStudentModal").disabled = true;
  document.getElementById("btnCapNhatStudentModal").disabled = false;
  for (let student of listNguoiDung.danhSachNguoiDung) {
    if (student.ma === ma) {
      document.getElementById("maStudent").value = student.ma;
      document.getElementById("hoTenStudent").value = student.hoTen;
      document.getElementById("diaChiStudent").value = student.diaChi;
      document.getElementById("emailStudent").value = student.email;
      document.getElementById("toan").value = student.toan;
      document.getElementById("ly").value = student.ly;
      document.getElementById("hoa").value = student.hoa;
      break;
    }
  }
  document.getElementById("btnThemStudent").click();
};
document.getElementById("btnCapNhatStudentModal").onclick = function () {
  // input: student
  let nguoiDung = new Student();

  //lấy dữ liệu value 
  nguoiDung.ma = document.querySelector("#maStudent").value;
  nguoiDung.hoTen = document.querySelector("#hoTenStudent").value;
  nguoiDung.diaChi = document.querySelector("#diaChiStudent").value;
  nguoiDung.email = document.querySelector("#emailStudent").value;
  nguoiDung.toan = document.querySelector("#toan").value;
  nguoiDung.ly = document.querySelector("#ly").value;
  nguoiDung.hoa = document.querySelector("#hoa").value;
  nguoiDung.dtb = (Number(nguoiDung.toan)+Number(nguoiDung.hoa)+Number(nguoiDung.ly))/3;

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

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nguoiDung.ma, "error-number-maStudent", "Mã") &
    checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenStudent", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nguoiDung.email, "error-emailStudent", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNguoiDung.updateUser(nguoiDung);

  //xuất ra giao diện
  renderTable(listNguoiDung.danhSachNguoiDung);

  document.getElementById("btnDongStudentModal").click();
  document.getElementById("maStudent").disabled = false;
  document.getElementById("btnThemStudentModal").disabled = false;
  luuLocalStrage();
  clearFormStudent();
};
// ================================================================================
  // HÀM Clear Form
function clearFormStudent () {
  const arrInput = document.querySelectorAll("#mainFormStudent input");
  const arrAnnounce = document.querySelectorAll("#mainFormStudent .sp-thongbao");
  for (let input of arrInput) {
    input.value = "";
  }
  for (let input of arrAnnounce) {
    input.value = "";
  }
};



// ==========================================================================================
// ========== EMPLOYEE ==========
document.querySelector("#btnThemEmployeeModal").onclick = () => {
  // input: employee
  let nguoiDung = new Employee();

  //lấy dữ liệu value
  nguoiDung.ma = document.querySelector("#maEmployee").value;
  nguoiDung.hoTen = document.querySelector("#hoTenEmployee").value;
  nguoiDung.diaChi = document.querySelector("#diaChiEmployee").value;
  nguoiDung.email = document.querySelector("#emailEmployee").value;
  nguoiDung.soNgayLam = document.querySelector("#soNgayLam").value;
  nguoiDung.luongNgay = document.querySelector("#luongNgay").value;
  nguoiDung.tienLuong = Number(nguoiDung.soNgayLam)*Number(nguoiDung.luongNgay);


  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nguoiDung.ma, "error-required-maEmployee", "Mã") &
    checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenEmployee", "Họ và Tên") &
    checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiEmployee", "Địa chỉ") &
    checked.kiemTraRong(nguoiDung.email, "error-required-emailEmployee", "Email") &
    checked.kiemTraRong(nguoiDung.soNgayLam,"error-required-soNgayLam","Số ngày làm") &
    checked.kiemTraRong(nguoiDung.luongNgay,"error-required-luongNgay","Lương ngày") &
    /* length */
    checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maEmployee", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nguoiDung.ma, "error-number-maEmployee", "Mã") &
    checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenEmployee", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nguoiDung.email, "error-emailEmployee", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNguoiDung.addUser(nguoiDung);

  //xuất ra giao diện
  renderTable(listNguoiDung.danhSachNguoiDung);
  luuLocalStrage();
  document.getElementById("btnDongEmployeeModal").click();
  clearFormEmployee();
};
// ================================================================================
// ========== Hàm chặn User bị trùng ================
document.getElementById("maEmployee").oninput = () => {
  for (let index = 0; index < listNguoiDung.danhSachNguoiDung.length; index++) {
    if (
      listNguoiDung.danhSachNguoiDung[index].ma == document.getElementById("maEmployee").value
    ) {
      document.getElementById("error-Dup-maEmployee").innerHTML = `Tài khoản đã tồn tại`;
      document.getElementById("btnThemEmployeeModal").disabled = true;
      break;
    } else {
      document.getElementById("error-Dup-maEmployee").innerHTML = "";
      document.getElementById("btnThemEmployeeModal").disabled = false;
    }
  }
};
// ================================================================================
// ============= Hàm Cập Nhật thông tin Employee ================
//cập nhật thông tin
window.updateInfoEmployee = (ma) => {
  document.getElementById("maEmployee").disabled = true;
  document.getElementById("btnThemEmployeeModal").disabled = true;
  document.getElementById("btnCapNhatEmployeeModal").disabled = false;
  for (let employee of listNguoiDung.danhSachNguoiDung) {
    if (employee.ma === ma) {
      document.getElementById("maEmployee").value = employee.ma;
      document.getElementById("hoTenEmployee").value = employee.hoTen;
      document.getElementById("diaChiEmployee").value = employee.diaChi;
      document.getElementById("emailEmployee").value = employee.email;
      document.getElementById("soNgayLam").value = employee.soNgayLam;
      document.getElementById("luongNgay").value = employee.luongNgay;
      break;
    }
  }
  document.getElementById("btnThemEmployee").click();
};
document.getElementById("btnCapNhatEmployeeModal").onclick = function () {
  // input: employee
  let nguoiDung = new Employee();

  //lấy dữ liệu value
  nguoiDung.ma = document.querySelector("#maEmployee").value;
  nguoiDung.hoTen = document.querySelector("#hoTenEmployee").value;
  nguoiDung.diaChi = document.querySelector("#diaChiEmployee").value;
  nguoiDung.email = document.querySelector("#emailEmployee").value;
  nguoiDung.soNgayLam = document.querySelector("#soNgayLam").value;
  nguoiDung.luongNgay = document.querySelector("#luongNgay").value;
  nguoiDung.tienLuong = Number(nguoiDung.soNgayLam)*Number(nguoiDung.luongNgay);


  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nguoiDung.ma, "error-required-maEmployee", "Mã") &
    checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenEmployee", "Họ và Tên") &
    checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiEmployee", "Địa chỉ") &
    checked.kiemTraRong(nguoiDung.email, "error-required-emailEmployee", "Email") &
    checked.kiemTraRong(nguoiDung.soNgayLam,"error-required-soNgayLam","Số ngày làm") &
    checked.kiemTraRong(nguoiDung.luongNgay,"error-required-luongNgay","Lương ngày") &
    /* length */
    checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maEmployee", "Mã", 4, 6);

  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nguoiDung.ma, "error-number-maEmployee", "Mã") &
    checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenEmployee", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nguoiDung.email, "error-emailEmployee", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNguoiDung.updateUser(nguoiDung);

  //xuất ra giao diện
  renderTable(listNguoiDung.danhSachNguoiDung);

  document.getElementById("btnDongEmployeeModal").click();
  document.getElementById("maEmployee").disabled = false;
  document.getElementById("btnThemEmployeeModal").disabled = false;
  luuLocalStrage();
  clearFormEmployee();
};
// ================================================================================
  // HÀM Clear Form
function clearFormEmployee () {
  const arrInput = document.querySelectorAll("#mainFormEmployee input");
  const arrAnnounce = document.querySelectorAll("#mainFormEmployee .sp-thongbao");
  for (let input of arrInput) {
    input.value = "";
  }
  for (let input of arrAnnounce) {
    input.value = "";
  }
};


// ==========================================================================================
// ========== CUSTOMER ==========
document.querySelector("#btnThemCustomerModal").onclick = () => {
  // input: customer 
  let nguoiDung = new Customer();

  //lấy dữ liệu value
  nguoiDung.ma = document.querySelector("#maCustomer").value;
  nguoiDung.hoTen = document.querySelector("#hoTenCustomer").value;
  nguoiDung.diaChi = document.querySelector("#diaChiCustomer").value;
  nguoiDung.email = document.querySelector("#emailCustomer").value;
  nguoiDung.tenCongTy = document.querySelector('#tenCongTy').value;
  nguoiDung.triGiaHoaDon = document.getElementById("triGiaHoaDon").value;
  nguoiDung.danhGia = document.getElementById("danhGia").value;

 //Validation
 let valid = true;
 /* kiểm tra rỗng */
 valid =
   checked.kiemTraRong(nguoiDung.ma, "error-required-maCustomer", "Mã") &
   checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenCustomer", "Họ và Tên") &
   checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiCustomer", "Địa chỉ") &
   checked.kiemTraRong(nguoiDung.email, "error-required-emailCustomer", "Email") &
   checked.kiemTraRong(nguoiDung.tenCongTy,"error-required-tenCongTy","Tên công ty") &
   checked.kiemTraRong(nguoiDung.triGiaHoaDon,"error-required-triGiaHoaDon","Trị giá hoán đổi") &
   checked.kiemTraRong(nguoiDung.danhGia, "error-required-danhGia", "Đánh giá") &
   /* length */
   checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maCustomer", "Mã", 4, 6);

 /* kiểu ký tự */
 valid =
   checked.kiemtraSo(nguoiDung.ma, "error-number-maCustomer", "Mã") &
   checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenCustomer", "Họ tên");
 if (!valid) {
   return;
 }
 /* định dạng mail */
 valid = checked.kiemTraEmail(nguoiDung.email, "error-emailCustomer", "Email");
 if (!valid) {
   return;
 }
 //thêm vào mãng trống
  listNguoiDung.addUser(nguoiDung);

  //xuất ra giao diện
  renderTable(listNguoiDung.danhSachNguoiDung);
  luuLocalStrage();
  document.getElementById("btnDongCustomerModal").click();
  clearFormCustomer();
};
// ================================================================================
// ========== Hàm chặn User bị trùng ================
document.getElementById("maCustomer").oninput = () => {
  for (let index = 0; index < listNguoiDung.danhSachNguoiDung.length; index++) {
    if (
      listNguoiDung.danhSachNguoiDung[index].ma == document.getElementById("maCustomer").value
    ) {
      document.getElementById("error-Dup-maCustomer").innerHTML = `Tài khoản đã tồn tại`;
      document.getElementById("btnThemCustomerModal").disabled = true;
      break;
    } else {
      document.getElementById("error-Dup-maCustomer").innerHTML = "";
      document.getElementById("btnThemCustomerModal").disabled = false;
    }
  }
};
// ================================================================================
// ============= Hàm Cập Nhật thông tin Customer ================
//cập nhật thông tin
window.updateInfoCustomer = (ma) => {
  document.getElementById("maCustomer").disabled = true;
  document.getElementById("btnThemCustomerModal").disabled = true;
  document.getElementById("btnCapNhatCustomerModal").disabled = false;
  for (let customer of listNguoiDung.danhSachNguoiDung) {
    if (customer.ma === ma) {
      document.getElementById("maCustomer").value = customer.ma;
      document.getElementById("hoTenCustomer").value = customer.hoTen;
      document.getElementById("diaChiCustomer").value = customer.diaChi;
      document.getElementById("emailCustomer").value = customer.email;
      document.getElementById("tenCongTy").value = customer.tenCongTy;
      document.getElementById("triGiaHoaDon").value = customer.triGiaHoaDon;
      document.getElementById("danhGia").value = customer.danhGia;
      break;
    }
  }
  document.getElementById("btnThemCustomer").click();
};
document.getElementById("btnCapNhatCustomerModal").onclick = function () {
   // input: customer 
   let nguoiDung = new Customer();

   //lấy dữ liệu value
   nguoiDung.ma = document.querySelector("#maCustomer").value;
   nguoiDung.hoTen = document.querySelector("#hoTenCustomer").value;
   nguoiDung.diaChi = document.querySelector("#diaChiCustomer").value;
   nguoiDung.email = document.querySelector("#emailCustomer").value;
    nguoiDung.tenCongTy = document.querySelector('#tenCongTy').value;
   nguoiDung.triGiaHoaDon = document.getElementById("triGiaHoaDon").value;
   nguoiDung.danhGia = document.getElementById("danhGia").value;
 
  //Validation
  let valid = true;
  /* kiểm tra rỗng */
  valid =
    checked.kiemTraRong(nguoiDung.ma, "error-required-maCustomer", "Mã") &
    checked.kiemTraRong(nguoiDung.hoTen, "error-required-hoTenCustomer", "Họ và Tên") &
    checked.kiemTraRong(nguoiDung.diaChi, "error-required-diaChiCustomer", "Địa chỉ") &
    checked.kiemTraRong(nguoiDung.email, "error-required-emailCustomer", "Email") &
    checked.kiemTraRong(nguoiDung.tenCongTy,"error-required-soNgayLam","Tên công ty") &
    checked.kiemTraRong(nguoiDung.triGiaHoaDon,"error-required-triGiaHoaDon","Trị giá hoán đổi") &
    checked.kiemTraRong(nguoiDung.danhGia, "error-required-danhGia", "Đánh giá") &
    /* length */
    checked.kiemTraLength(nguoiDung.ma, "error-min-max-length-maCustomer", "Mã", 4, 6);
 
  /* kiểu ký tự */
  valid =
    checked.kiemtraSo(nguoiDung.ma, "error-number-maCustomer", "Mã") &
    checked.kiemTraKyTu(nguoiDung.hoTen, "error-allLetter-hoTenCustomer", "Họ tên");
  if (!valid) {
    return;
  }
  /* định dạng mail */
  valid = checked.kiemTraEmail(nguoiDung.email, "error-emailCustomer", "Email");
  if (!valid) {
    return;
  }
  //thêm vào mãng trống
  listNguoiDung.updateUser(nguoiDung);

  //xuất ra giao diện
  renderTable(listNguoiDung.danhSachNguoiDung);

  document.getElementById("btnDongCustomerModal").click();
  document.getElementById("maCustomer").disabled = false;
  document.getElementById("btnThemCustomerModal").disabled = false;
  luuLocalStrage();
  clearFormCustomer();
};
// ================================================================================
  // HÀM Clear Form
function clearFormCustomer () {
  const arrInput = document.querySelectorAll("#mainFormCustomer input");
  const arrAnnounce = document.querySelectorAll("#mainFormCustomer .sp-thongbao");
  for (let input of arrInput) {
    input.value = "";
  }
  for (let input of arrAnnounce) {
    input.value = "";
  }
};

// ================================================================================================================
// HÀM TÍNH ĐIỂM TRUNG BÌNH
document.querySelector("#btnTinhDTB").onclick = () => {
  var mangNguoiDung = listNguoiDung.danhSachNguoiDung;
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
            Điểm Hóa:${user.hoa} <br/>
            <span class="bg-info border rounded">Điểm Trung Bình: ${user.dtb}</span>
          </th>
        `
      } else if (user.soNgayLam) {
        loaiUser = 'Employee';
        khacString = `
          <th>
            Số Ngày Làm: ${user.soNgayLam} <br/>
            Lương Theo Ngày: ${user.luongNgay} vnđ <br/>
            Tiền Lương:
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
  }
  renderTable(mangNguoiDung);
};
// // ================================================================================================================
// // HÀM TÍNH LƯƠNG
document.querySelector("#btnTinhLuong").onclick = () => {
  var mangNguoiDung = listNguoiDung.danhSachNguoiDung;
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
            Điểm Hóa:${user.hoa} <br/>
          </th>
        `
      } else if (user.soNgayLam) {
        loaiUser = 'Employee';
        khacString = `
          <th>
            Số Ngày Làm: ${user.soNgayLam} <br/>
            Lương Theo Ngày: ${user.luongNgay} vnđ <br/>
            <span class="bg-primary border rounded">Tiền Lương: ${user.tienLuong} vnđ</span>
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
  }
  renderTable(mangNguoiDung);
};
