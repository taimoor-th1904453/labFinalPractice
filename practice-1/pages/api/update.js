import fs from "fs"
export default function handler(req, res) {
    req.body = JSON.parse(req.body)
    const countries = JSON.parse(fs.readFileSync("data/countries.json"))
    const countryIndex = countries.findIndex(c => c.alpha2 === req.body.country)
    if (countryIndex == -1) {
        res.status(404).send();
        return
    }
    const country = countries[countryIndex];
    if (req.method === "POST")
        country.isInFavorites = true;
    else if (req.method === "DELETE")
        country.isInFavorites = false;

    countries.splice(countryIndex, 1, country);
    fs.writeFileSync("data/countries.json", JSON.stringify(countries))
    res.status(203).send()
}