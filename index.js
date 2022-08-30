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
