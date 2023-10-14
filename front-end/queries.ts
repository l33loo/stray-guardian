export async function getPins(filter: any, token: string | null) {
  try {
    const trueAnimals: string[] = Object.keys(filter).filter(
      (key, i) => filter[key]
    );
    let url = "http://10.10.11.36:8000/api/stray";
    if (trueAnimals.length > 0) {
      url += `?type=${trueAnimals.join(",")}`;
    }

    if (token) {
      url += `${url.includes("?") ? "&" : "?"}token=${token}`;
    }
    console.log("Fetching...", url);
    const r = await fetch(url);
    return await r.json();
  } catch (e) {
    console.log(e);
    return [];
  }
}
