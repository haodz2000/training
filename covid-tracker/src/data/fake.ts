import {
  IDataChart,
  IDistrict,
  IGroup,
  ILocation,
  IProvince,
  IShift,
  IWard,
  IUser,
  IVaccineUsed,
  IVaccineRegistrationInfo,
  IDocument
} from '../interfaces';

export const listProvinces: IProvince[] = [
  {
    code: 1,
    districts: [],
    name: 'Thành Phố Hà Nội',
    label: 'Thành Phố Hà Nội',
    codename: 'thanh_pho_ha_noi',
    division_type: 'thành phố trung ương',
    phone_code: 24
  },
  {
    code: 2,
    districts: [],
    name: 'Hà Nam',
    label: 'Hà Nam',
    codename: 'thanh_pho_ha_nam',
    division_type: 'thành phố trung ương',
    phone_code: 23
  },
  {
    code: 3,
    districts: [],
    name: 'Hải Phòng',
    label: 'Hải Phòng',
    codename: 'thanh_pho_hai_phong',
    division_type: 'thành phố trung ương',
    phone_code: 25
  }
];
export const listDistricts: IDistrict[] = [
  {
    code: 1,
    wards: [],
    label: 'Quận Cầu Giấy',
    name: 'Quận Cầu Giấy',
    division_type: 'quận',
    codename: 'quan_cau_giay',
    province_code: 1
  },
  {
    code: 2,
    wards: [],
    name: 'Quận Hoàn Kiếm',
    label: 'Quận Hoàn Kiếm',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 1
  },
  {
    code: 3,
    wards: [],
    name: 'Quận Hai Bà Trưng',
    label: 'Quận Hai Bà Trưng',
    division_type: 'quận',
    codename: 'quan_hai_ba_trung',
    province_code: 1
  },
  {
    code: 4,
    wards: [],
    name: 'Huyện Bình Lục',
    label: 'Huyện Bình Lục',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 5,
    wards: [],
    name: 'Huyện Kim Bảng',
    label: 'Huyện Kim Bảng',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 6,
    wards: [],
    name: 'Huyện lý Nhân',
    label: 'Huyện lý Nhân',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 2
  },
  {
    code: 7,
    wards: [],
    name: 'Quận Ba Đình',
    label: 'Quận Ba Đình',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 1
  },
  {
    code: 8,
    wards: [],
    name: 'Quận Quang Nam',
    label: 'Quận Quang Nam',
    division_type: 'quận',
    codename: 'quan_ba_dinh',
    province_code: 3
  }
];
export const listWards: IWard[] = [
  {
    code: 1,
    name: 'Xã 1',
    label: 'Xã 1',
    division_type: 'xa',
    codename: 'xa_1',
    district_code: 1
  },
  {
    code: 2,
    name: 'Xã 2',
    label: 'Xã 2',
    division_type: 'xa',
    codename: 'xa_2',
    district_code: 2
  },
  {
    code: 3,
    name: 'Xã 3',
    label: 'Xã 3',
    division_type: 'xa',
    codename: 'xa_3',
    district_code: 3
  },
  {
    code: 4,
    name: 'Xã 4',
    label: 'Xã 4',
    division_type: 'xa',
    codename: 'xa_4',
    district_code: 4
  },
  {
    code: 5,
    name: 'Xã 5',
    label: 'Xã 5',
    division_type: 'xa',
    codename: 'xa_5',
    district_code: 5
  },
  {
    code: 6,
    name: 'Xã 6',
    label: 'Xã 6',
    division_type: 'xa',
    codename: 'xa_6',
    district_code: 6
  },
  {
    code: 7,
    name: 'Xã 7',
    label: 'Xã 7',
    division_type: 'xa',
    codename: 'xa_7',
    district_code: 7
  },
  {
    code: 8,
    name: 'Xã 8',
    label: 'Xã 8',
    division_type: 'xa',
    codename: 'xa_8',
    district_code: 8
  }
];

export const dataChart: IDataChart[] = [
  {
    date: '07/08',
    total: 183713
  },
  {
    date: '08/08',
    total: 184924
  },
  {
    date: '09/08',
    total: 451428
  },
  {
    date: '10/08',
    total: 486115
  },
  {
    date: '11/08',
    total: 635135
  },
  {
    date: '12/08',
    total: 619648
  },
  {
    date: '13/08',
    total: 311386
  },
  {
    date: '14/08',
    total: 152167
  },
  {
    date: '15/08',
    total: 306398
  }
];

export const dataLocation: ILocation[] = [
  {
    id: 1,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 2,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 3,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 4,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 5,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 6,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 7,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Hà Nam',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 8,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Hà Nam',
    leader: 'Nguyễn Thị Kim Liên Lie',
    table: 1
  },
  {
    id: 9,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 10,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Xã 2',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 11,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 12,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 13,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 14,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 15,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Cầu Giấy',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 16,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Xã 1',
    district: 'Quận Cầu Giấy',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 17,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  },
  {
    id: 18,
    name: 'Bệnh viện Đa khoa Medlatec',
    street: '42-44 Nghĩa Dũng',
    ward: 'Phúc Xá',
    district: 'Quận Ba Đình',
    province: 'Thành Phố Hà Nội',
    leader: 'Nguyễn Thị Kim Liên',
    table: 1
  }
];

export const groups: IGroup[] = [
  {
    id: 1,
    label:
      '1. Người làm việc trong các cơ sở y tế, ngành y tế (công lập và tư nhân)'
  },
  {
    id: 2,
    label:
      '2. Người tham gia phòng chống dịch (Thành viên Ban chỉ đạo phòng, chống dịch các cấp, người làm việc ở các khu cách ly, làm nhiệm vụ truy vết, điều tra dịch tễ, tổ Covid dựa vào cộng đồng, tình nguyện viên, phóng viên...)'
  },
  {
    id: 3,
    label: '3. Lực lượng Quân đội'
  },
  {
    id: 4,
    label: '4. Lực lượng Công an'
  },
  {
    id: 5,
    label:
      '5. Nhân viên, cán bộ ngoại giao của Việt Nam và thân nhân được cử đi nước ngoài; người làm việc trong các cơ quan Ngoại giao, Lãnh sự, các tổ chức quốc tế hoạt động tại Việt Nam'
  }
];
export const shifts: IShift[] = [
  {
    id: 0,
    label: 'Buổi sáng'
  },
  {
    id: 1,
    label: 'Buổi chiều'
  },
  {
    id: 2,
    label: 'Cả ngày'
  }
];
export const listUsers: IUser[] = [
  {
    id: 'sadjsabass',
    email: 'user1@gmail.com',
    password: '123456789',
    name: 'John Smith',
    province: 'Thành phố Hà Nội',
    district: 'Quận Hai Bà Trưng',
    ward: 'Phường Bách Khoa',
    card: '0123456789',
    gender: 'Nam',
    birthday: Date()
  },
  {
    id: 'fadgsvhbj',
    email: 'user2@gmail.com',
    password: '123456789',
    name: 'Peter',
    province: 'string',
    district: 'string',
    ward: 'string',
    card: '0123456789',
    gender: 'Nam',
    birthday: Date()
  }
];

export const listVaccineUsed: IVaccineUsed[] = [
  {
    id: 1,
    userId: 'sadjsabass',
    vaccineName: 'Vaccine Vero Cell',
    numberLot: 'VC201',
    time: Date(),
    location: 'Xã Vĩnh Ninh - Vĩnh Quỳnh - Thanh Trì- Hà Nội',
    numberInjection: 1
  },
  {
    id: 2,
    userId: 'sadjsabass',
    vaccineName: 'Vaccine Vero Cell',
    numberLot: 'VC201',
    time: Date(),
    location: 'Xã Vĩnh Ninh - Vĩnh Quỳnh - Thanh Trì- Hà Nội',
    numberInjection: 2
  },
  {
    id: 3,
    userId: 'fadgsvhbj',
    vaccineName: 'Vaccine Vero Cell',
    numberLot: 'VC201',
    time: Date(),
    location: 'Xã Vĩnh Ninh - Vĩnh Quỳnh - Thanh Trì- Hà Nội',
    numberInjection: 1
  },
  {
    id: 4,
    userId: 'fadgsvhbj',
    vaccineName: 'Vaccine Vero Cell',
    numberLot: 'VC201',
    time: Date(),
    location: 'Xã Vĩnh Ninh - Vĩnh Quỳnh - Thanh Trì- Hà Nội',
    numberInjection: 2
  }
];

export const listVaccineRegistration: IVaccineRegistrationInfo[] = [
  {
    id: 1,
    userId: 'sadjsabass',
    group: 'aaaaaaaaaaa',
    cardInsurance: '0123456789',
    job: 'aaaaaa',
    workplace: 'aaaaaaa',
    address: 'aaaaaa',
    time: Date(),
    shift: 'Ca sang',
    status: 1
  },
  {
    id: 2,
    userId: 'fadgsvhbj',
    group: 'aaaaaaaaaaa',
    cardInsurance: '0123456789',
    job: 'aaaaaa',
    workplace: 'aaaaaaa',
    address: 'aaaaaa',
    time: Date(),
    shift: 'Ca sang',
    status: 1
  }
];

export const listDocument: IDocument[] = [
  {
    id: 1,
    title: 'Danh sách bệnh nhân covid-19',
    description: 'Mô tả',
    link: '#',
    download: 250
  },
  {
    id: 2,
    title: 'Danh sách bệnh nhân covid-19',
    description: 'Mô tả',
    link: '#',
    download: 250
  },
  {
    id: 3,
    title: 'Danh sách bệnh nhân covid-19',
    description: 'Mô tả',
    link: '#',
    download: 250
  },
  {
    id: 4,
    title: 'Danh sách bệnh nhân covid-19',
    description: 'Mô tả',
    link: '#',
    download: 250
  }
];
