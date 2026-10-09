import type { Metadata } from "next";
import AdminShell from "@/components/AdminShell";

export const metadata: Metadata = {
  title: "Veda Admin — Command & Fulfillment",
  description: "Operations console: orders, stock, patrons, taxonomy, journal, dispatch.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
