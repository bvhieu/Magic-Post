"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import CheckboxFive from "@/components/Checkboxes/CheckboxFive";
import CheckboxFour from "@/components/Checkboxes/CheckboxFour";
import CheckboxOne from "@/components/Checkboxes/CheckboxOne";
import CheckboxThree from "@/components/Checkboxes/CheckboxThree";
import CheckboxTwo from "@/components/Checkboxes/CheckboxTwo";
import SwitcherFour from "@/components/Switchers/SwitcherFour";
import SwitcherOne from "@/components/Switchers/SwitcherOne";
import SwitcherThree from "@/components/Switchers/SwitcherThree";
import SwitcherTwo from "@/components/Switchers/SwitcherTwo";
import { BRAND } from "@/types/brand";
import { useState } from "react";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "xác nhận gửi lên điểm tập kết",
  description: "xác nhận gửi lên điểm tập kết",
  // other metadata
};

const pointStaff = () => {
  const [orderId, setOrderId] = useState("");
  const [region, setRegion] = useState(localStorage.getItem("region"));
  const [point, setPoint] = useState(localStorage.getItem("point"));

  const handleUpdate = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: localStorage.getItem("role"),
        orderId: orderId,
        region: region,
        point: point,
      }),
    };
    const response = await fetch(
      "http://localhost:5000/api/v1/orders/ps/changePoint",
      requestOptions
    );
    const result = await response.json();
    if (response.ok) {
      alert("Xác nhận đơn hàng thành công");
    } else {
      alert("Xác nhận đơn hàng thất bại");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Point Staff" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
          Xác nhận hàng từ điểm tập kết về
        </h4>

        <div className="hidden sm:block">
          <form action="https://formbold.com/s/unique_form_id" method="POST">
            <div className="relative">
              <input
                type="text"
                placeholder="Nhập mã đơn hàng"
                className="w-full bg-transparent pl-9 pr-4 font-medium focus:outline-none xl:w-125 border-2 h-10 border-rose-600 rounded"
                onChange={(e) => setOrderId(e.target.value)}
              />
            </div>
          </form>
          <button
            className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
            onClick={handleUpdate}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </>
  );
};

export default pointStaff;
