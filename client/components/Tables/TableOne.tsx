"use client";

import { BRAND } from "@/types/brand";
import Image from "next/image";
import { useEffect, useState } from "react";

const TableHome = () => {
  const [orderId, setOrderId] = useState("");
  const [users, setUsers] = useState({
    orderId: "Mời", fromName: "bạn", fromAddress: "nhập",
    toName: "chính", toAddress: "xác", content: "mã", region: "đơn", point: "hàng", typePackage: "!", fromPhone: "!", orderStatus: "!"
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        orderId: orderId,
      }),
    };
    const response = await fetch(
      "http://localhost:5000/api/v1/orders/findMyOrder",
      requestOptions
    );
    if (response.ok) {
      const data = await response.json();
      setUsers(data.orders);
    } else {
      setUsers({
        orderId: "Mời", fromName: "bạn", fromAddress: "nhập",
        toName: "chính", toAddress: "xác", content: "mã", region: "đơn", point: "hàng", typePackage: "!", fromPhone: "!", orderStatus: "!"
      });

      alert('Không tồn tại đơn hàng');
    }

  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Trạng thái đơn hàng
      </h4>

      <div className="hidden sm:block flex items-center justify-center ">
        <form onSubmit={handleSubmit}>
          <div className="relative py-10 flex items-center justify-center ">
            <input
              type="text"
              placeholder="Nhập mã đơn hàng"
              className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125 border-2 h-10 border-rose-600 rounded"
              onChange={(e) => setOrderId(e.target.value)}
            />
            <button type="submit" className=" px-5 py-10  ">
              <svg
                className=" hover:fill-primary dark:fill-bodydark dark:hover:fill-primary"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
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
          </div>
        </form>
      </div>

      <thead>
        <tr className="bg-gray-2 text-left dark:bg-meta-4">
          <th className="min-w-[20px] py-4 px-2 font-medium text-black dark:text-white xl:pl-5">
            STT
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Mã đơn hàng
          </th>
          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
            Người gửi
          </th>

          <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white">
            Người nhận
          </th>
          <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
            Nội dung
          </th>
          <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
            Khu vực
          </th>
          <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
            Điểm giao dịch
          </th>

          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Loại hàng
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            SĐT
          </th>
          <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
            Trạng thái
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            1
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.orderId}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.fromName + " - (" + users.fromAddress + ")"}
          </td>

          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.toName + " - (" + users.toAddress + ")"}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.content}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.region}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.point}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.typePackage}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.fromPhone}
          </td>
          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
            {users.orderStatus}
          </td>
        </tr>
      </tbody>
    </div>
  );
};

export default TableHome;
