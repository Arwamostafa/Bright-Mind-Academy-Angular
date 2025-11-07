import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords'
})
export class TruncateWordsPipe implements PipeTransform {

  transform(value: string, limit: number = 12): string {
    if (!value) return '';
    
    const words = value.split(' ');
    if (words.length <= limit) {
      return value;
    }
    
    return words.slice(0, limit).join(' ') + '...';
  }

  

}
