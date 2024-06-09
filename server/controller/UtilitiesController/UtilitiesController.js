const
    { getStudentsByStatusServices }
        = require("../../services/UtilitiesServices/utilitiesServices");

exports.getStudentsByStatusController = async (req, res, next) => {
    try {
        const query = req.params;
        const request = await getStudentsByStatusServices(query);
        res.status(200).json({
            status: "success",
            message: "Get Status Students successfully",
            data: request,
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Can't Fetched data",
            error: err,
        })
    }
};
