import { BRAND } from "@/types/brand";
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

const TableManagePoint = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Trưởng điểm giao dịch
      </h4>

      <Link
        href="/auth/signup"
        className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Tạo tài khoản cho giao dịch viên
      </Link>

      <label className="mb-2.5 block text-black dark:text-white">
        Thống kê hàng gửi, nhận của điểm giao dịch
      </label>

      <div className="flex flex-col">
        <div className="border grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
          <div className="border p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">STT</h5>
          </div>
          <div className="border p-2.5 xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              {" "}
              Mã đơn
            </h5>
          </div>
          <div className="border p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Thời gian
            </h5>
          </div>
          <div className="border p-2.5 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Trạng thái
            </h5>
          </div>
          <div className="border hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Vị trí
            </h5>
          </div>
          <div className="border hidden p-2.5 text-center sm:block xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Điện thoại
            </h5>
          </div>
        </div>

        {brandData.map((brand, key) => (
          <div
            className={`grid grid-cols-3 sm:grid-cols-6 ${
              key === brandData.length - 1
                ? ""
                : "border-b border-stroke dark:border-strokedark"
            }`}
            key={key}
          >
            <div className="border flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{key + 1}</p>
            </div>

            <div className="border flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {brand.id}
              </p>
            </div>

            <div className="border flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-black dark:text-white">{brand.time}</p>
            </div>

            <div className="border flex items-center justify-center p-2.5 xl:p-5">
              <p className="text-meta-3">{brand.status}</p>
            </div>

            <div className="border hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-black dark:text-white">{brand.local}</p>
            </div>

            <div className="border hidden items-center justify-center p-2.5 sm:flex xl:p-5">
              <p className="text-meta-5">0{brand.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableManagePoint;
