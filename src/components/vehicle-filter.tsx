"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VehicleFilters, VehicleMake } from "@/types/vehicle";

export default function VehicleFilter() {
  const [makes, setMakes] = useState<VehicleMake[]>([]);
  const [filters, setFilters] = useState<VehicleFilters>({
    makeId: null,
    year: null,
  });
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  const { toast } = useToast();

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2014 },
    (_, i) => currentYear - i,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const fetchMakes = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/GetMakesForVehicleType/car?format=json`,
        );

        const data = await response.json();

        setMakes(data.Results);
      } catch (error) {
        console.error("Error fetching makes:", error);

        toast({
          title: "Error",
          description: "Failed to load vehicle makes. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchMakes();
  }, [toast]);

  const handleSearch = () => {
    if (filters.makeId && filters.year) {
      router.push(`/results/${filters.makeId}/${filters.year}`);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">
          Vehicle Make
        </label>
        <Select
          disabled={loading}
          value={filters.makeId?.toString()}
          onValueChange={(value) =>
            setFilters({ ...filters, makeId: parseInt(value) })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a make" />
          </SelectTrigger>
          <SelectContent>
            {makes.map((make) => (
              <SelectItem key={make.MakeId} value={make.MakeId.toString()}>
                {make.MakeName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Model Year</label>
        <Select
          value={filters.year?.toString()}
          onValueChange={(value) =>
            setFilters({ ...filters, year: parseInt(value) })
          }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {years.map((year) => (
              <SelectItem key={year} value={year.toString()}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        className="w-full"
        disabled={!filters.makeId || !filters.year}
        onClick={handleSearch}
      >
        Next
      </Button>
    </div>
  );
}
