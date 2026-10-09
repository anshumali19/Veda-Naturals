import { Suspense } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-[104px] bg-white" aria-hidden="true" />}>
        <SiteHeader />
      </Suspense>
      <main className="flex-1 flex flex-col w-full">{children}</main>
      <SiteFooter />
    </>
  );
}
