const express = require("express")
const uuid = require("uuid")

let members = require("../../Members")

const router = express.Router()

router.get("/", (req, res) => res.json(members))

router.get("/:id", (req, res) => {

    const member = members.filter(member => member.id === Number(req.params.id))

    if (member.length !== 0) {
        res.json(member)
    } else {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    }
})

router.post("/", (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }

    if (newMember.name === undefined || newMember.email === undefined) {
        res.status(400).json({ msg: "Please include a name and email" })
    } else {
        members = [...members, newMember]
        res.send(req.body)
    }
})

router.put("/:id", (req, res) => {

    const [memberToUpdate] = members.filter(member => member.id === Number(req.params.id))

    if (memberToUpdate === undefined) {
        res.status(400).json({ msg: `No member with the id of ${req.params.id}` })
    } else {
        const updatedMember = {
            ...memberToUpdate,
            name: req.body.name || memberToUpdate.name,
            email: req.body.email || memberToUpdate.email
        }

        members = members.map(member => {
            return member.id === Number(req.params.id)
                ? updatedMember
                : member
        })
        res.send(members)
    }
})

router.delete("/:id", (req, res) => {

    members = members.filter(member => member.id !== Number(req.params.id))

    res.send(members)
})

module.exports = router