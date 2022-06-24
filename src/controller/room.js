exports.roomController = async (req, res) => {
    res.set('Content-Type', 'applicaton/json');
    res.send({
        id: '1234'
    });
    console.log("Got body:", req.body);
    res.status(200);
}