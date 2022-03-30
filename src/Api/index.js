export const getData = async () => {
  const data = await fetch(
    "https://countriesnow.space/api/v0.1/countries/capital"
  );
  const value = await data.json();
  return value;
};
