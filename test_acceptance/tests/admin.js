module.exports = {
    'Can navigate to new post form': (client) => {
        // execute
        client.url('http://localhost:8080/admin')
            .waitForElementVisible('body', 100)
            .useXpath()
            .waitForElementVisible('//*[contains(text(), "New Post")]', 100)
            .click('//*[contains(text(), "New Post")]')
            .pause(100);

        client.useCss();

        // assert
        client.expect.element('h1.page-title').text.to.equal('New Post');
        client.expect.element('form#new-post').to.be.visible;

        client.end();
    },
};
