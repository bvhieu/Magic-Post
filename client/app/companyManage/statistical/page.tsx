"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { BRAND } from "@/types/brand";
import { useEffect, useState } from "react";

export const metadata: Metadata = {
  title: "Thống kê",
  description: "Trang thống kê của giám đốc công ty",
  // other metadata
};

const statistical = () => {
  const [users, setUsers] = useState([{}]);
  const [orders, setOrders] = useState("");

  useEffect(() => {
    // Gửi yêu cầu đến API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/orders"); // Thay 'URL_API' bằng URL thực tế của API
        const data = await response.json();
        setUsers(data.orders);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData(); // Gọi hàm để lấy dữ liệu khi component được mount
  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được mount

  return (
    <>
      <Breadcrumb pageName="Thống kê" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Thống kê hàng gửi, hàng nhận trên toàn quốc
        </h4>

        <div className="flex">
          <div className="mb-4.5 px-50">
            <label className="mb-2.5 block text-black dark:text-white">
              Điểm tập kết
            </label>
            <div className=" relative z-20 bg-transparent dark:bg-form-input">
              <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option value="">Toàn quốc</option>
                <option value="">Miền Bắc</option>
                <option value="">Miền Trung</option>
                <option value="">Miền Nam</option>
              </select>
            </div>
          </div>

          <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Điểm giao dịch
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-10 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option value="">Điểm giao dịch 1</option>
                <option value="">Điểm giao dịch 2</option>
                <option value="">Điểm giao dịch 3</option>
                <option value="">Điểm giao dịch 4</option>
              </select>
            </div>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[10px] py-4 px-2 font-medium text-black dark:text-white xl:pl-5">
                  STT
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Mã đơn hàng
                </th>
                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Người gửi
                </th>

                <th className="min-w-[170px] py-4 px-4 font-medium text-black dark:text-white">
                  Người nhận
                </th>
                <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white">
                  Nội dung
                </th>
                <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                  Khu vực
                </th>
                <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                  Điểm giao dịch
                </th>

                <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                  Loại hàng
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  SĐT
                </th>
                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index}>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {index + 1}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.orderId}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.fromName + " - (" + user.fromAddress + ")"}
                    </td>

                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.toName + " - (" + user.toAddress + ")"}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.content}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.region}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.point}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.typePackage}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.fromPhone}
                    </td>
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      {user.orderStatus}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default statistical;
