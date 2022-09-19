const { model } = require("mongoose")

function __parse(data  ){
    return JSON.parse(JSON.stringify(data))
 }


module.exports = {
    __parse
}
