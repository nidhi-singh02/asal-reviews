module.exports = (req,res) =>{
    let errors = req.validationErrors()
    if (errors) {
        let errarray = []
        errors.forEach(elem => {
            errarray.push(elem.msg)
        })
        return { status: 0, data: errarray }

    }
    return { status: 1, data: [] }
}