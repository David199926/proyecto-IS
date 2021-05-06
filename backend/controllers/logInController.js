const validate = (req, res) => {
    const {username, password} = req.body;
    res.json({ validated: username === "Bruno" && password === "123" });
}

module.exports = {
    validate
}