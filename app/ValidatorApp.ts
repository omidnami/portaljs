import { ValidatorTypeObject } from "../interfaces/validator";

class Validators{
    private messages: any[] = [];

    check(input:any[]){

        input.forEach((i:ValidatorTypeObject) => {
            const v = i.validate.split('|');
            for (const data of v) {
                switch(data.trim()){
                    case 'email':
                       let email = this.isEmail(i.input);
                       !email && this.messages.push(i.msg || 'Invalid value');
                    break;
                    case 'str':
                       let str = this.isString(i.input);
                       !str && this.messages.push(i.msg || 'Invalid value');
                    break;
                    case 'int':
                       let int = this.isNumber(i.input);
                       !int && this.messages.push(i.msg || 'Invalid value');
                    break;
                    case 'url':
                       let url = this.isUrl(i.input);
                       !url && this.messages.push(i.msg || 'Invalid value');
                    break;
                    case 'sec:1':
                       let sec1 = this.passwordSecure1(i.input);
                       !sec1 && this.messages.push(i.msg || 'Invalid value');
                    break;
                    case 'sec:2':
                        let sec2 = this.passwordSecure2(i.input);
                        !sec2 && this.messages.push(i.msg || 'Invalid value');
                     break;
                    case 'sec:3':
                       let sec3 = this.passwordSecure3(i.input || 'Invalid value');
                       !sec3 && this.messages.push(i.msg || 'Invalid value');
                    break;
                    case 'sec:4':
                       let sec4 = this.passwordSecure4(i.input);
                       !sec4 && this.messages.push(i.msg || 'Invalid value');
                    break;
                    case 'sec:5':
                        let sec5 = this.passwordSecure5(i.input || 'Invalid value');
                        !sec5 && this.messages.push(i.msg || 'Invalid value');
                     break;
                     default:
                        const ds = data.split(':');
                        if (ds[0] == 'min') {
                        let min = this.isMin(i.input,ds[1]);
                        !min && this.messages.push(i.msg || 'Invalid value');
                        break;
                        }
                        else if (ds[0] == 'max') {
                            let max = this.isMax(i.input,ds[1]);
                            !max && this.messages.push(i.msg || 'Invalid value');
                            break;
                        }
                        else{
                           this.messages.push(i.msg || 'Invalid value');
                            break;
                        }
                        
                     break;
                }
            }
        });
       return this.messages = Array.from(new Set(this.messages));
        
    }

    isEmail(email:any){
        const result = email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/            
            );
        
        return result ? true : false;
    }

    isNumber(int:any){
        const result = !/\D/.test(int);
        return result;
    }

    isUrl(url:any){
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
      const result = !!pattern.test(url);
      return result;
    }

    isString(str:any){
       const s = typeof str;
       const result = s == 'string';
       return result;
    }

    passwordSecure1(pass:any){
        // pass >= 6 char
        const result = pass.length >= 6;
        return result;
    }

    passwordSecure2(value:any){
        // pass >= 6 char AND {a-z | 0-9};
        let result = true;
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            result = false;
    }
      
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            result = false;
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            result = false;
        }
        const isValidLength = /^.{6,30}$/;
        if (!isValidLength.test(value)) {
            result = false;
        }
        return result;
    }

    passwordSecure3(value:any){
        // pass >= 8 char AND {A-z};
        let result = true;
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            result = false;
        }
      
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            result = false;
        }
      
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            result = false;
        }
      
        const isValidLength = /^.{8,30}$/;
        if (!isValidLength.test(value)) {
            result = false;
        }
        return result;
    }

    passwordSecure4(value:any){
        // pass > 8 char AND {A-z | 0-9};
        let result = true;
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            result = false;
        }
      
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            result = false;
        }
      
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            result = false;
        }
      
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            result = false;
        }
      
        const isValidLength = /^.{9,30}$/;
        if (!isValidLength.test(value)) {
            result = false;
        }
         return result;
    }

    passwordSecure5(value:any){
        // pass > 8 char AND {A-z | 0-9 | @?=-.,};
        let result = true;
        const isNonWhiteSpace = /^\S*$/;
        if (!isNonWhiteSpace.test(value)) {
            result = false;
        }
      
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) {
            result = false;
        }
      
        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) {
            result = false;
        }
      
        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) {
            result = false;
        }
      
        const isContainsSymbol =
          /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(value)) {
            result = false;
        }
      
        const isValidLength = /^.{9,30}$/;
        if (!isValidLength.test(value)) {
            result = false;
        }
        return result;
    }

    isMin(value:any,length:any){
        const result = (''+value).length >= Number(length);
       return result;
    }

    isMax(value:any,length:any){
        const result = (''+value).length <= Number(length);
        return result;
    }
}

export default new Validators();