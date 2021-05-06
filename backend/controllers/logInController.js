const validate = (req, res) => {
    const {username, password} = req.body;
    // err index
    // 0 => unregistered user
    // 1 => wrong password
    if (username !== "Bruno") {
        res.json({error: 0});
    }
    if (password !== "123") {
        res.json({error: 1});
    }
    res.json({error: null});
}

module.exports = {
    validate
}