const MDElementQueries = {
    heading: (size) => RegExp(`^#{${size}} .*$`),
    link: /\[(.*)\]\(([^ ]*) ?"?([^"]*)"?\)/g,
    bold: /(?<!\*)\*\*([^\*]+)\*\*(?!\*)/g,
    italic: /(?<!\*)\*([^\*]+)\*(?!\*)/g,
    boldItalic: /(?<!\*)\*{3}([^\*]+)\*{3}(?!\*)/g,
    lineBreak: /(  )|<br>$/g,
    blockQuote: /(?:(?<=^|\n)>.*\n)+/g,
    ulist: /(?:(?<=^|\n)- .*\n)+/g,
    ulistItems: /(?<=^|\n)- (.*)/g,
    olist: /(?:(?<=^|\n)\d+ .*\n)+/g,
    olistItems: /(?<=^|\n)\d+ (.*)\n/g,
    hr: /(?<=^|\n)[\-*_]{3,}(?=$|\n)/g
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

class MDListElement extends MDElement {
    _items;
    constructor(...items){
        this._items = items;
    }
    getItem(index){
        return this._items[index];
    }
    setItem(index,value){
        this._items[index] = value;
    }
    addItem(value){
        this._items.push(value);
    }
    
    toString(toStrFunc = (x,i) => x.toString()){
        var str = "";
        for(var i = 0; i < this._items.length; i++){
            str += toStrFunc(this._items[i], i);
        }
        return str;
    }
    
    toHTML(listType){
        var htmlList = document.createElement(listType);
        for(var item of this._items){
            var li = document.createElement("li");
            li.append(item.toHTML());
            htmlList.append(li);
        }
        return htmlList;
    }
}

class MDUListElement extends MDListElement {
    toString(){
        return super.toString((x,i) => `- ${x.toString()}`);
    }
    toHTML(){
        return super.toHTML("ul");
    }
}

class MDOListElement extends MDListElement {
    toString(){
        return super.toString((x,i) => `${i.toString()}. ${x.toString()}`);
    }
    toHTML(){
        return super.toHTML("ol");
    }
}

class MDBlockQuoteElement extends MDTextElement {
    toString(){
        return this._text.split("\n").map(x => `> ${x}`).join("\n");
    }
    toHTML(){
        var htmlBQ = document.createElement("blockquote");
        htmlBQ.textContent = this._text;
        return htmlBQ;
    }
}

class MDHorizontalRuleElement extends MDElement {
    toString(char = "-", length = 3){
        if(!["-","*","_"].includes(char)){
            char = "-"
        }
        if(length < 3){
            length = 3;
        }
        return char.repeat(length);
    }
    toHTML(){
        return document.createElement("hr");
    }
}
