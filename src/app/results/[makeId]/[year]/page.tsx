import { VehicleModel } from "@/types/vehicle";

export default async function VehicleResults({
  params,
}: {
  params: { makeId: string; year: string };
}) {
  const { makeId, year } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`,
  );

  const data = await response.json();
  const models = data.Results || [];

  return (
    <div className="container mx-auto py-8 fade-in">
      <h1 className="mb-8 text-center text-3xl font-bold">
        Available Models ({year})
      </h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {models.map((model: VehicleModel) => (
          <div
            key={model.Model_ID}
            className="rounded-lg bg-white p-6 shadow-md transition-shadow hover:shadow-lg"
          >
            <h2 className="mb-2 text-xl font-semibold">{model.Model_Name}</h2>
            <p className="text-gray-600">{model.Make_Name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
