export async function getPins() {
  try {
    const r = await fetch("http://10.10.11.36:8000/api/stray");
    return await r.json();
  } catch (e) {
    console.log(e);
    return [];
  }
}
