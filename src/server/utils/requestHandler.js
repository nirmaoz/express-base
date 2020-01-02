const handleRequest = async (req, res) => {
    let {params} = req.query;
    params = decodeURIComponent(params);

    res.json({
        params
    });
};

const handleRequestError = (res, error) => {
    console.log(error);
    res.status(500).json({
        error
    });
};

module.exports = {
    handleRequest,
    handleRequestError
};
