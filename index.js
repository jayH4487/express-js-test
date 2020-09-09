const express = require("express")
const path = require("path")

const logger = require("./middleware/logger")
const members = require("./Members")


const app = express()


app.use(logger)

app.get("/api/members", (req, res) => res.json(members))

app.get("/api/members/:id", (req, res) => {

    const member = members.filter(member => member.id === Number(req.params.id))

    if (member.length !== 0) {
        res.json(member)
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
})


app.use(express.static(path.join(__dirname, "public")))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))