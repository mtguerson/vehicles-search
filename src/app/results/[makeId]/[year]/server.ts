export const dynamicParams = true;

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/GetAllMakes?format=json`,
  );
  const data = await response.json();

  if (!data.Results) return [];

  const makes = data.Results.slice(0, 5);
  const years = ["2022", "2023", "2024"];

  return makes.flatMap((make: { Make_ID: string }) =>
    years.map((year) => ({
      makeId: make.Make_ID.toString(),
      year: year,
    })),
  );
}
