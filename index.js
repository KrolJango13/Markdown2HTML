const MDElementQueries = {
    heading: (size) => RegExp(`^#{${size}} .*$`),
    link: /\[(.*)\]\((.*)\)/g,
    bold: /(?<!\*)\*\*([^\*]+)\*\*(?!\*)/g,
    italic: /(?<!\*)\*([^\*]+)\*(?!\*)/g,
    boldItalic: /(?<!\*)\*{3}([^\*]+)\*{3}(?!\*)/g,
    lineBreak: /(  )|<br>$/g,
    blockQuote: /(?:(?<=^|\n)>.*\n)+/g,
    ulist: /(?:(?<=^|\n)- .*\n)+/g,
    ulistItems: /(?<=^|\n)- (.*)/g,
    olist: /(?:(?<=^|\n)\d+ .*\n)+/g,
    olistItems: /(?<=^|\n)\d+ (.*)\n/g
}

class MDElement extends Element {
    toHTML(){
        return null;
    }
}

class MDBasicTextElement extends MDElement {
    _text;
    constructor(text){
        this._text = text.toString();
    }
}

class MDHeaderElement extends MDBasicTextElement {
    #size;
    constructor(content, type = 1){
        this._text = content.toString();
        this.#size = type;
    }
    
    toString(){
        return `${"#".repeat(this.#size)} ${this._text}`;
    }
    
    toHTML(){
        var htmlHeader = document.createElement(`h${this.#size}`);
        htmlHeader.innerHTML = this._text;
        return htmlHeader;
    }
}

class MDLinkElement extends MDBasicTextElement {
    #href;
    #title;
    constructor(href,content = href, title = content){
        this.#href = href;
        this._text = content.toString();
        this.#title = title;
    }
    
    toString(){
        return `[${this._text}](${this.#href} "${this.#title}")`;
    }
    
    toHTML(){
        var htmlA = document.createElement("a");
        htmlA.href = this.#href;
        htmlA.title = this.#title;
        htmlA.textContent = this._text;
        return htmlA;
    }
}

class MDBoldElement extends MDBasicTextElement {
    toString(){
        return `**${this._text}**`;
    }
    toHTML(){
        var htmlBold = document.createElement("b");
        htmlBold.textContent = this._text;
        return htmlBold;
    }
}

class MDItalicElement extends MDBasicTextElement {
    toString(){
        return `*${this._text}*`;
    }
    toHTML(){
        var htmlItalic = document.createElement("i");
        htmlItalic.textContent = this._text;
        return htmlItalic;
    }
}
