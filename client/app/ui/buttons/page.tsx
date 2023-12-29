import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Buttons Page",
  description: "Buttons page ",
  // other metadata
};

const Buttons = () => {
  return (
    <>
      <Breadcrumb pageName="Buttons" />

      <Link
        href="#"
        className="inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
      >
        Button
      </Link>
    </>
  );
};

export default Buttons;
