const removeAccents = require('remove-accents');

module.exports = {
    generateSlug(title, date) {
        const slug = `${this.slugifyTitle(title)}_${date}`;
        return slug.toLowerCase();
    },
    slugifyTitle(title) {
        let slugTitle = title.replace(/\s/g, '-');
        slugTitle = removeAccents(slugTitle);
        slugTitle = slugTitle.replace(/[^a-zA-Z0-9\-]/g, '');
        return slugTitle.replace(/\-{2,}/g, '-');
    },
};
