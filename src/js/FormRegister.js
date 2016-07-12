export default class FormRegister {
    update() {
        this.forms = Array.from(document.querySelectorAll('form'));
        this.addListeners();
    }
    addListeners() {
        this.forms.forEach((f) => {
            f.addEventListener('submit', (e) => {
                // e.preventDefault();
            });
        });
    }
}
