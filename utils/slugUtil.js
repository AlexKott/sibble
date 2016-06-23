const removeAccents = require('remove-accents');

module.exports = {
    generateSlug(title, date) {
        const slug = `${this.slugifyTitle(title)}_${date}`;
        return slug.toLowerCase();
    },
    slugifyTitle(title) {
        return removeAccents(title.replace(/\s/g, '-'));
    },
};
