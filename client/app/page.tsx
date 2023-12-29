// import ECommerce from "@/components/Dashboard/E-commerce";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableHome from "@/components/Tables/TableOne";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Magic Post",
  description: "This is Home page.",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Breadcrumb pageName="Home" />

      <TableHome />
    </>
  );
}
