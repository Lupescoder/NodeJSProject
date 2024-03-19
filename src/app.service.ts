import { Injectable } from '@nestjs/common';
import { format, parse } from 'date-fns';

@Injectable()
export class AppService {
 
  convertDate(dateString : string, inputFormat: string, outputFormat: string): string{
    const parseDate = parse(dateString, inputFormat, new Date());
    return format(parseDate, outputFormat)
  }

  formatOnlyNumber(string: string): string{
    return  string.replace(/\D/g, '');
  }

  returnFormatCep(cep: string): string{
    return cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
  }

  returnFormatCpf(cpf: string): string {
    return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/,'$1.$2.$3-$4');
  }

  returnFormatPhone(phone: string): string{
    const cleaned = phone.replace(/\D/g, '');
    const countryCode = cleaned.substring(0, 2);
    const areaCode = cleaned.substring(2, 3)
    const mainPart = cleaned.substring(3, 7); 
    const endPart = cleaned.substring(7); 
    return `(${countryCode}) ${areaCode} ${mainPart}-${endPart}`;
  }

}
