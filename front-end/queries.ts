export async function getPins(filter: any) {
  try {
    const trueAnimals: string[] = Object.keys(filter).filter(
      (key, i) => filter[key]
    );
    let url = "http://10.10.11.36:8000/api/stray";
    console.log(trueAnimals);
    if (trueAnimals.length > 0) {
      url += `?type=${trueAnimals.join(",")}`;
    }

    const r = await fetch(url);
    return await r.json();
  } catch (e) {
    console.log(e);
    return [];
  }
}
