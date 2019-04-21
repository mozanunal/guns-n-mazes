SMessageParser = (stringMessage) => {
    let msg = JSON.parse(stringMessage);
    switch (msg.flag) {
        case 0:
        break;
        case 1:
        break;
        case 2:
        break;
        default:
        break;
    }
}


module.exports = SMessageParser;