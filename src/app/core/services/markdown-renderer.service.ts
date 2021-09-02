import { Injectable } from '@angular/core';
import { MarkedRenderer } from 'ngx-markdown';
const uslug = require('uslug');

@Injectable({
  providedIn: 'root',
})
export class MarkdownRenderer extends MarkedRenderer {
  private counter = 0;

  constructor() {
    super();
  }

  code(code: string, language: string, isEscaped: boolean) {
    const codeHTML = `
    <div id="code-${this.counter}">
      ${new MarkedRenderer().code(code, language, isEscaped)}
    </div>
    `;
    this.counter++;

    return codeHTML;
  }

  heading(text: string, level: number) {
    const escapedText = text
      .toLowerCase()
      .replace(/&#[0-9]*;/g, '')
      .replace(/[^\wàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+/g, '-');
    const id = uslug(escapedText);
    console.log('text : ' + text);
    console.log('escaped : ' + escapedText);
    console.log('uslug : ' + id);

    return `
      <h${level} id="${id}">
        ${text}<a name="${escapedText}" class="anchor" routerLink="${id}">
        <i-feather name="link-2" class="header-link"></i-feather>
        </a>
      </h${level}>
    `;
  }
}
