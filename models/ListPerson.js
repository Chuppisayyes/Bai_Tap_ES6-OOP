export default class ListUser {
    constructor() {
        this.danhSachNguoiDung = [];
    }
    addUser(nguoiDung) {
        this.danhSachNguoiDung.push(nguoiDung);
    }
    updateUser(nguoiDungMoi) {
        const nguoiDungCu = this.findIDUser(nguoiDungMoi.ma);
        Object.assign(nguoiDungCu, nguoiDungMoi);
    }
    findIDUser(ma) {
        const nguoiDung = this.danhSachNguoiDung.find((nguoiDung) => {
            return nguoiDung.ma === ma;
        });
        return nguoiDung;
    }
    filterUser(loai) {
        console.log(loai);
        if(loai === 'student'){
            const newListUser = this.danhSachNguoiDung.filter(nguoiDung => nguoiDung.loai === "student")
            return newListUser;
        }else if(loai === 'employee'){
            const newListUser = this.danhSachNguoiDung.filter(nguoiDung => nguoiDung.loai === "employee")
            return newListUser;
        }else if(loai === 'customer'){
            const newListUser = this.danhSachNguoiDung.filter(nguoiDung => nguoiDung.loai=== "customer")
            return newListUser;
        } else{
            return this.danhSachNguoiDung;
        }
    }
    sortUser(danhSach, thuTu) {
        if (thuTu === 1) {
            danhSach.sort((a, b) => {
                let x = a.hoTen.toLowerCase();
                let y = b.hoTen.toLowerCase();
                if (x > y) { return 1; }
                if (x < y) { return -1; }
                return 0;
            });
        } else {
            danhSach.sort((a, b) => {
                let x = a.hoTen.toLowerCase();
                let y = b.hoTen.toLowerCase();
                if (x > y) { return -1; }
                if (x < y) { return 1; }
                return 0;
            });
        }
        return danhSach;
    }
}