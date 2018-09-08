export class Word {
    constructor(word, importance) {
        this.word = word;
        this.importance = importance;
    }

    static getWord(wordObject) {
        return wordObject.word;
    }
}