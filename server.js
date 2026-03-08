import express from "express"
import fetch from "node-fetch"

const app = express()

let cache = null
let lastFetch = 0
const CACHE_TIME = 5000

app.get("/players/:universeId", async (req, res) => {
    const now = Date.now()

    if (cache && now - lastFetch < CACHE_TIME) {
        return res.json(cache)
    }

    const id = req.params.universeId
    const r = await fetch(`https://games.roblox.com/v1/games?universeIds=${id}`)
    const data = await r.json()

    cache = data
    lastFetch = now

    res.json(data)
})

app.listen(3000, () => {
    console.log("Proxy running")
})