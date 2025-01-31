"use client";

import VehicleFilter from "@/components/vehicle-filter";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="mb-8 text-center text-4xl font-bold">Vehicle Search</h1>
        <Suspense fallback={<Loading />}>
          <VehicleFilter />
        </Suspense>
      </div>
    </main>
  );
}
