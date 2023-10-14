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

export async function setPin(data: FormData) {
  try {
    const response = await fetch("http://10.10.11.36:8000/api/stray/", {
      method: "POST",
      // mode: "cors", // no-cors, *cors, same-origin
      // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "multipart/form-data",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      // referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  } catch(e) {
    console.log(e);
    return null;
  }
}