module.exports = {
    'User can open a single post': (client) => {
        // execute
        client.url('http://localhost:8080')
            .waitForElementVisible('body', 100)
            .click('.post-list__teaser')
            .pause(100);

        // assert
        client.expect.element('h1.page-title').text.to.not.equal('Start');
        client.expect.element('div.date').to.be.visible;
        client.expect.element('div.post').to.be.visible;

        client.end();
    },
};
