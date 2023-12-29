'use client'
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import { BRAND } from "@/types/brand";
import { useState, useEffect } from "react";

export const metadata: Metadata = {
  title: "Form Layout Page | Next.js E-commerce Dashboard Template",
  description: "This is Form Layout page for TailAdmin Next.js",
  // other metadata
};


const statistical = () => {
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [region, setRegion] = useState(localStorage.getItem('region'));
  const [point, setPoint] = useState(localStorage.getItem('point'));
  const [order, setOrder] = useState([{}]);

  useEffect(() => {
    // Gửi yêu cầu đến API để lấy dữ liệu
    const fetchData = async () => {
      try {
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            role: role,
            region: region,
            point: point
          }),
        };
        const response = await fetch(
          "http://localhost:5000/api/v1/orders/rm/searchDandR", requestOptions
        ); // Thay 'URL_API' bằng URL thực tế của API
        const data = await response.json();
        setOrder(data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData(); // Gọi hàm để lấy dữ liệu khi component được mount
  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi component được mount

  return (
    <>
      <Breadcrumb pageName="statistical" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Thống kê hàng đến và đi của điểm tập kết
        </h4>



        <div className="flex flex-col">
          <div className="border grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6">
            <div className="border p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                STT
              </h5>
            </div>
            <div className="border p-2.5 xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                {" "}
                Mã đơn
              </h5>
            </div>
            <div className="border p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Người gửi
              </h5>
            </div>
            <div className="border p-2.5 text-center xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Người nhận
              </h5>
            </div>
            <div className="border hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Vị trí
              </h5>
            </div>
            <div className="border hidden p-2.5 text-center sm:block xl:p-5">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Trạng thái
              </h5>
            </div>
          </div>

          {order.map((order_, key) => (
            <div
              className={`grid grid-cols-3 sm:grid-cols-6 ${key === order.length - 1
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
                  {order_.orderId}
                </p>
              </div>

              <div className="border flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{order_.fromName + " - " + order_.fromAddress}</p>
              </div>

              <div className="border flex items-center justify-center p-2.5 xl:p-5">
                <p className="text-black dark:text-white">{order_.toName + " - " + order_.toAddress}</p>
              </div>

              <div className="border hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-black dark:text-white">{order_.point + " - " + order_.region}</p>
              </div>

              <div className="border hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                <p className="text-meta-5">{order_.orderStatus}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default statistical;
