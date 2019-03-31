const {isValidType} = require('./validators')

const isRequiredsNeeded = body => {
    const requireds = [
        isValidType(body, 'name', 'string'),
        isValidType(body, 'email', 'string'),
    ];


    if (requireds.some(isValid => isValid === false)) {
        return true;
    }

    return false;
}

module.exports = { isRequiredsNeeded, }
