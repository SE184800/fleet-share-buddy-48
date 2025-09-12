export type Role = "admin" | "member";

export interface GroupUser {
  id: string;
  name: string;
  avatar?: string;
  role: Role;
  email?: string;
}

export interface Vehicle {
  id: string;
  name: string;
  imageUrl?: string;
  status: "available" | "in-use" | "maintenance";
  info?: string;
}

export interface Transaction {
  id: string;
  userId: string;
  name: string;
  amount: number;
  type: "in" | "out";
  date: string; // ISO date string
}

export interface Group {
  id: string;
  name: string;
  ownerId: string;
  users: GroupUser[]; // includes owner with role "admin"
  fund: number; // VND
  minTransfer: number; // VND
  vehicles: Vehicle[];
  transactions: Transaction[];
}

export const CURRENT_USER_ID = "u-01";

export const groups: Group[] = [
  {
    id: "g-hcm-q1",
    name: "Nhóm HCM - Quận 1",
    ownerId: "u-02",
    users: [
      { id: "u-02", name: "Nguyễn Văn A", role: "admin", email: "a.nguyen@example.com", avatar: "/placeholder.svg" },
      { id: "u-01", name: "Trần B", role: "member", email: "tran.b@example.com", avatar: "/placeholder.svg" },
      { id: "u-03", name: "Lê C", role: "member", email: "le.c@example.com", avatar: "/placeholder.svg" },
      { id: "u-04", name: "Phạm D", role: "member", email: "pham.d@example.com", avatar: "/placeholder.svg" }
    ],
    fund: 50000000,
    minTransfer: 50000,
    vehicles: [
      { id: "v-01", name: "VinFast VF8 2024", status: "available", imageUrl: "/placeholder.svg", info: "Biển số 51A-123.45" },
      { id: "v-02", name: "Hyundai Kona Electric", status: "in-use", imageUrl: "/placeholder.svg", info: "Biển số 51A-678.90" }
    ],
    transactions: [
      { id: "t-01", userId: "u-01", name: "Trần B", amount: 2000000, type: "in", date: "2024-08-05" },
      { id: "t-02", userId: "u-03", name: "Lê C", amount: 1500000, type: "in", date: "2024-08-10" },
      { id: "t-03", userId: "u-04", name: "Phạm D", amount: 500000, type: "out", date: "2024-08-15" }
    ]
  },
  {
    id: "g-hn-cg",
    name: "Nhóm HN - Cầu Giấy",
    ownerId: "u-05",
    users: [
      { id: "u-05", name: "Phạm Quốc E", role: "admin", email: "pham.e@example.com", avatar: "/placeholder.svg" },
      { id: "u-01", name: "Trần B", role: "member", email: "tran.b@example.com", avatar: "/placeholder.svg" },
      { id: "u-06", name: "Ngô F", role: "member", email: "ngo.f@example.com", avatar: "/placeholder.svg" }
    ],
    fund: 35000000,
    minTransfer: 50000,
    vehicles: [
      { id: "v-03", name: "Tesla Model 3", status: "maintenance", imageUrl: "/placeholder.svg", info: "Đang bảo dưỡng" }
    ],
    transactions: [
      { id: "t-10", userId: "u-05", name: "Phạm Quốc E", amount: 3000000, type: "in", date: "2024-07-25" },
      { id: "t-11", userId: "u-01", name: "Trần B", amount: 700000, type: "out", date: "2024-08-02" }
    ]
  }
];

export function getGroupById(id: string): Group | undefined {
  return groups.find((g) => g.id === id);
}
