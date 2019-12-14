import { AbstractControl } from '@angular/forms';

export class Validations {
    public static ValidateCPF(control: AbstractControl) {
        const cpf = control.value;

        let sum = 0;
        let rest: number;
        let valid: boolean;

        const regex = new RegExp('[0-9]{11}');

        if (
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999' ||
            !regex.test(cpf)
        ) {
            valid = false;
        } else {
            for (let i = 1; i <= 9; i++) {
                sum = sum + parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
            rest = (sum * 10) % 11;

            if (rest === 10 || rest === 11) {
                rest = 0;
            }
            if (rest !== parseInt(cpf.substring(9, 10))) {
                valid = false;
            }

            sum = 0;
            for (let i = 1; i <= 10; i++) {
                sum = sum + parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
            rest = (sum * 10) % 11;

            if (rest === 10 || rest === 11) {
                rest = 0;
            }
            if (rest !== parseInt(cpf.substring(10, 11))) {
                valid = false;
            }
            valid = true;
        }

        if (valid) {
            return null;
        }

        return { cpfInvalido: true };
    }

    public static ValidateCNPJ(control: AbstractControl) {
        let cnpj = control.value.replace(/[^\d]+/g, '');

        if (cnpj.length !== 14) {
            return { cnpjInvalido: true };
        }

        let t = cnpj.length - 2,
            d = cnpj.substring(t),
            d1 = parseInt(d.charAt(0)),
            d2 = parseInt(d.charAt(1)),
            calc = x => {
                let n = cnpj.substring(0, x),
                    y = x - 7,
                    s = 0,
                    r = 0;

                for (let i = x; i >= 1; i--) {
                    s += n.charAt(x - i) * y--;
                    if (y < 2) y = 9;
                }

                r = 11 - (s % 11);
                return r > 9 ? 0 : r;
            };

        if (calc(t) === d1 && calc(t + 1) === d2) {
            return null;
        } else {
            return { cnpjInvalido: true };
        }
    }

    public static ValidateDate(control: AbstractControl) {
        const date = control.value;
        const yearCurrent = new Date().getFullYear();

        const day = date.substr(0, 2);
        const month = date.substr(3, 2);
        const year = date.substr(6, 4);

        if (day > 31) {
            return { dataInvalida: true };
        }

        if (month > 12) {
            return { dataInvalida: true };
        }

        if (year > yearCurrent) {
            return { dataInvalida: true };
        }

        return null;
    }

    public static ValidateDontAllowEmail(control: AbstractControl) {
        const regex = new RegExp(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );

        let valid: boolean;

        const email = control.value;

        if (!regex.test(email)) {
            return null;
        } else {
            valid = false;
        }

        return { emailInvalido: true };
    }
}
