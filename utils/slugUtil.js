const removeAccents = require('remove-accents');

module.exports = {
    generateSlug(title, date) {
        return this.slugifyTitle(title) + '_' + date;
    },
    slugifyTitle(title) {
        return removeAccents(title.replace(/\s/g, '-'));
    }
};
