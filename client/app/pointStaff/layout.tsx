"use client";
import "../globals.css";
import "../data-tables-css.css";
import "../satoshi.css";
import React, { useState, useRef, useEffect } from "react";
import Loader from "@/components/common/Loader";
import SidebarLinkGroup from "../../components/Sidebar/SidebarLinkGroup";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [loading, setLoading] = useState<boolean>(true);
  let storedSidebarExpanded = "true";
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const getOrderId = async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: localStorage.getItem("role"),
      }),
    };
    const response = await fetch(
      "http://localhost:5000/api/v1/orders/ps/createId",
      requestOptions
    );
    const result = await response.json();
    localStorage.setItem("orderId", result.orderId);
  };

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          {loading ? (
            <Loader />
          ) : (
            <div className="flex h-screen overflow-hidden">
              {/* Sidebar  */}

              <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0">
                {/* Sidebar Menu  */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                  {/* Menu Group  */}
                  <div>
                    <div className="flex items-center justify-between gap-1 px-20 py-5.5 lg:py-5.5">
                      <Link href="/">
                        <Image
                          width={80}
                          height={80}
                          src={"/images/logo/logo1.png"}
                          alt="Logo"
                        />
                      </Link>
                    </div>
                    {/* Point Staff */}
                    <SidebarLinkGroup
                      activeCondition={
                        pathname === "/pointStaff" ||
                        pathname.includes("pointStaff")
                      }
                    >
                      {(handleClick, open) => {
                        return (
                          <React.Fragment>
                            <Link
                              href="#"
                              className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === "/pointStaff" ||
                                  pathname.includes("pointStaff")) &&
                                "bg-graydark dark:bg-meta-4"
                                }`}
                              onClick={(e) => {
                                e.preventDefault();
                                sidebarExpanded
                                  ? handleClick()
                                  : setSidebarExpanded(true);
                              }}
                            >
                              <svg
                                className="fill-current"
                                width="18"
                                height="18"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  d="M1.43425 7.5093H2.278C2.44675 7.5093 2.55925 7.3968 2.58737 7.31243L2.98112 6.32805H5.90612L6.27175 7.31243C6.328 7.48118 6.46862 7.5093 6.58112 7.5093H7.453C7.76237 7.48118 7.87487 7.25618 7.76237 7.03118L5.428 1.4343C5.37175 1.26555 5.3155 1.23743 5.14675 1.23743H3.88112C3.76862 1.23743 3.59987 1.29368 3.57175 1.4343L1.153 7.08743C1.0405 7.2843 1.20925 7.5093 1.43425 7.5093ZM4.47175 2.98118L5.3155 5.17493H3.59987L4.47175 2.98118Z"
                                  fill=""
                                />
                                <path
                                  d="M10.1249 2.5031H16.8749C17.2124 2.5031 17.5218 2.22185 17.5218 1.85623C17.5218 1.4906 17.2405 1.20935 16.8749 1.20935H10.1249C9.7874 1.20935 9.47803 1.4906 9.47803 1.85623C9.47803 2.22185 9.75928 2.5031 10.1249 2.5031Z"
                                  fill=""
                                />
                                <path
                                  d="M16.8749 6.21558H10.1249C9.7874 6.21558 9.47803 6.49683 9.47803 6.86245C9.47803 7.22808 9.75928 7.50933 10.1249 7.50933H16.8749C17.2124 7.50933 17.5218 7.22808 17.5218 6.86245C17.5218 6.49683 17.2124 6.21558 16.8749 6.21558Z"
                                  fill=""
                                />
                                <path
                                  d="M16.875 11.1656H1.77187C1.43438 11.1656 1.125 11.4469 1.125 11.8125C1.125 12.1781 1.40625 12.4594 1.77187 12.4594H16.875C17.2125 12.4594 17.5219 12.1781 17.5219 11.8125C17.5219 11.4469 17.2125 11.1656 16.875 11.1656Z"
                                  fill=""
                                />
                                <path
                                  d="M16.875 16.1156H1.77187C1.43438 16.1156 1.125 16.3969 1.125 16.7625C1.125 17.1281 1.40625 17.4094 1.77187 17.4094H16.875C17.2125 17.4094 17.5219 17.1281 17.5219 16.7625C17.5219 16.3969 17.2125 16.1156 16.875 16.1156Z"
                                  fill="white"
                                />
                              </svg>
                              Point Staff
                              <svg
                                className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && "rotate-180"
                                  }`}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  clipRule="evenodd"
                                  d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                                  fill=""
                                />
                              </svg>
                            </Link>
                            {/* <!-- Dropdown Menu Start --> */}
                            <div
                              className={`translate transform overflow-hidden ${!open && "hidden"
                                }`}
                            >
                              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                                <li>
                                  <Link
                                    href="/pointStaff/createID"
                                    className={`first-letter:group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/pointStaff/createID" &&
                                      "text-white"
                                      }`}
                                    onClick={getOrderId}
                                  >
                                    Tạo đơn & in biên
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/pointStaff/statistical"
                                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/pointStaff/statistical" &&
                                      "text-white"
                                      }`}
                                  >
                                    Thống kê
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/pointStaff/confirmToPoint"
                                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname ===
                                      "/pointStaff/confirmToPoint" &&
                                      "text-white"
                                      }`}
                                  >
                                    Xác nhận hàng từ DTK về
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/pointStaff/delivery"
                                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/pointStaff/delivery" &&
                                      "text-white"
                                      }`}
                                  >
                                    Giao hàng
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href="/pointStaff/confirmToRegion"
                                    className={`group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ${pathname === "/pointStaff/confirmToRegion" &&
                                      "text-white"
                                      }`}
                                  >
                                    Tạo đơn hàng gửi lên ĐTK
                                  </Link>
                                </li>
                              </ul>
                            </div>
                            {/* <!-- Dropdown Menu End --> */}
                          </React.Fragment>
                        );
                      }}
                    </SidebarLinkGroup>

                    {/* Sidebar  */}
                  </div>
                </nav>
              </div>
              {/* Content Area */}
              <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                {/* Header */}
                <Header
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                {/* Header */}

                {/* Main Content */}
                <main>
                  <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                    {children}
                  </div>
                </main>
                {/* Main Content */}
              </div>
              {/* Content Area */}
            </div>
          )}
        </div>
      </body>
    </html>
  );
}
