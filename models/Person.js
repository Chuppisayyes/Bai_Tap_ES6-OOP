export class Person {
    constructor(hoTen,diaChi,ma,email){
        this.hoTen = hoTen;
        this.diaChi = diaChi;
        this.ma = ma;
        this.email = email;
    }
}
export class Student extends Person {
    constructor(ma, hoTen, diaChi, email, toan, ly, hoa,dtb) {
        super(ma, hoTen, diaChi, email);
        this.toan = toan;
        this.ly = ly;
        this.hoa = hoa;
        this.loai = 'student';
        this.diemTrungBinh = dtb;
    }
}
export class Employee extends Person {
    constructor(ma, hoTen, diaChi, email, soNgayLam, luongNgay,tienLuong) {
        super(ma, hoTen, diaChi, email);
        this.soNgayLam = soNgayLam;
        this.luongNgay = luongNgay;
        this.loai = 'employee';
        this.tienLuong = tienLuong;
    }

}
export class Customer extends Person {
    constructor(ma, hoTen, diaChi, email, tenCongTy, triGiaHoaDon, danhGia) {
        super(ma, hoTen, diaChi, email);
        this.tenCongTy = tenCongTy;
        this.triGiaHoaDon = triGiaHoaDon;
        this.danhGia = danhGia;
        this.loai = 'customer'
    }
}