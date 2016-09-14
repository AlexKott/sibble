import ajaxService from './ajaxService';

export default class FormRegister {
    constructor() {
        this.forms = [];
    }
    update() {
        this.forms = Array.from(document.querySelectorAll('form'));
        this.addListeners();
    }
    addListeners() {
        this.forms.forEach((f) => {
            f.addEventListener('submit', (e) => {
                if (window.FormData) {
                    e.preventDefault();
                    FormRegister.gatherData(f);
                }
            });
        });
    }
    static gatherData(form) {
        const formData = new FormData(form);
        const data = {};
        for (const entry of formData) {
            data[entry[0]] = entry[1];
        }
        const target = data.api_target;
        delete data.api_target;
        ajaxService.request(target, form.method, data);
    }
}
