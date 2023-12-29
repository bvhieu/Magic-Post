import { BRAND } from "@/types/brand";
import { Package } from "@/types/Accounts";
import Image from "next/image";
import Link from "next/link";

const brandData: BRAND[] = [
  {
    id: "DH00001",
    time: "7:00 12/12/2023",
    status: "Đang giao",
    local: "DGD123-Trung Hòa",
    phone: 357698999,
  },
  {
    id: "DH00001",
    time: "7:00 12/12/2023",
    status: "Đang giao",
    local: "DGD123-Trung Hòa",
    phone: 357698999,
  },
  {
    id: "DH00001",
    time: "7:00 12/12/2023",
    status: "Đang giao",
    local: "DGD123-Trung Hòa",
    phone: 357698999,
  },
  {
    id: "DH00001",
    time: "7:00 12/12/2023",
    status: "Đang giao",
    local: "DGD123-Trung Hòa",
    phone: 357698999,
  },
  {
    id: "DH00001",
    time: "7:00 12/12/2023",
    status: "Đang giao",
    local: "DGD123-Trung Hòa",
    phone: 357698999,
  },
];

const packageData: Package[] = [
  {
    name: "Nguyễn Đình Cường",
    username: "DTK-MB",
    role: "Trưởng ĐTK",
    region: `Miền Bắc`,
    transactionPoin: "",
    status: "Active",
  },
  {
    name: "Hoàng",
    role: "Trưởng ĐGD",
    username: "DGD-MB-01",
    region: `Miền Bắc`,
    transactionPoin: "Hà Nội",
    status: "Close",
  },
  {
    name: "Hoàng",
    role: "Trưởng ĐGD",
    username: "DGD-MB-01",
    region: `Miền Bắc`,
    transactionPoin: "Hà Nội",
    status: "Active",
  },
  {
    name: "Hoàng",
    role: "Trưởng ĐGD",
    username: "DGD-MB-01",
    region: `Miền Bắc`,
    transactionPoin: "Hà Nội",
    status: "Active",
  },
];

const TableRegionStaff = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Nhân viên điểm Tập kết
      </h4>

      <div className="hidden sm:block">
        <h5>Điểm tập kết chuyển đến</h5>
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div className="relative">
            <button className="absolute right-5 top-1/2 -translate-y-1/2 ">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                // icon search
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Nhập mã đơn hàng"
              className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125 border-2 h-10 border-rose-600 rounded"
            />
          </div>
        </form>
      </div>
      <Link
        href="/auth/signupManage"
        className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Xác nhận
      </Link>

      <div className="hidden sm:block">
        <h5>Điểm giao dịch chuyển đến</h5>
        <form action="https://formbold.com/s/unique_form_id" method="POST">
          <div className="relative">
            <button className="absolute right-5 top-1/2 -translate-y-1/2 ">
              <svg
                className="fill-body hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                // icon search
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M9.16666 3.33332C5.945 3.33332 3.33332 5.945 3.33332 9.16666C3.33332 12.3883 5.945 15 9.16666 15C12.3883 15 15 12.3883 15 9.16666C15 5.945 12.3883 3.33332 9.16666 3.33332ZM1.66666 9.16666C1.66666 5.02452 5.02452 1.66666 9.16666 1.66666C13.3088 1.66666 16.6667 5.02452 16.6667 9.16666C16.6667 13.3088 13.3088 16.6667 9.16666 16.6667C5.02452 16.6667 1.66666 13.3088 1.66666 9.16666Z"
                  fill=""
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.2857 13.2857C13.6112 12.9603 14.1388 12.9603 14.4642 13.2857L18.0892 16.9107C18.4147 17.2362 18.4147 17.7638 18.0892 18.0892C17.7638 18.4147 17.2362 18.4147 16.9107 18.0892L13.2857 14.4642C12.9603 14.1388 12.9603 13.6112 13.2857 13.2857Z"
                  fill=""
                />
              </svg>
            </button>

            <input
              type="text"
              placeholder="Nhập mã đơn hàng"
              className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125 border-2 h-10 border-rose-600 rounded"
            />
          </div>
        </form>
      </div>
      <Link
        href="/auth/signupManage"
        className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Xác nhận
      </Link>
    </div>
  );
};

export default TableRegionStaff;
