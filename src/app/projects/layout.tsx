import React from 'react';
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto max-w-3xl p-6">
      {/* Home Button (Top Left) */}
      <Link href="/" className="absolute top-4 left-4 text-sm text-gray-400 hover:text-gray-200 transition">
        ← Home
      </Link>

      {/* Page Content */}
      {children}
    </div>
  );
}