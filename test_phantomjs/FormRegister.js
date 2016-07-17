const sinon = require('sinon');
import FormRegister from '../src/js/FormRegister';

const handle = document.querySelector('#mocha');
let formRegister;

describe('Form register', () => {
    beforeEach(() => {
        formRegister = new FormRegister();
    });
    it('detect all forms in a document', () => {
        const form = document.createElement('form');
        handle.appendChild(form);
        formRegister.update();
        expect(formRegister.forms).to.have.lengthOf(1);

        const container = document.createElement('div');
        const newForm = document.createElement('form');
        container.appendChild(newForm);
        handle.appendChild(container);

        formRegister.update();
        expect(formRegister.forms).to.have.lengthOf(2);
    });
    it('should append the submit listeners on update', () => {
        const form = document.createElement('form');
        handle.appendChild(form);

        sinon.spy(formRegister, 'addListeners');
        formRegister.update();

        expect(formRegister.addListeners.calledOnce).to.be.true;
    });
    it('should call the data gatherer on submit', () => {
        const form = document.createElement('form');
        const submitButton = document.createElement('button');
        submitButton.setAttribute('type', 'submit');
        form.appendChild(submitButton);
        handle.appendChild(form);
        formRegister.update();

        sinon.stub(formRegister, 'gatherData');
        submitButton.click();

        expect(formRegister.gatherData.calledOnce).to.be.true;
    });
});
