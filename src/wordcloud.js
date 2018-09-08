import {create, scaleOrdinal, scaleSqrt, schemeCategory10} from 'd3';
import d3Cloud from 'd3-cloud';
import {Word} from "./Word";
import {D3CloudData} from "./D3CloudData";

export class WordCloud {

    constructor(words, width, height) {
        this.words = words;
        this._width = width;
        this._height = height;

        this.svg = create("svg").attr("width", this._width).attr("height", this._height);

        this._init(words);
    }

    getElement = () => {
        return this.svg._groups[0][0];
    };

    update = (words) => {
        console.log('UPDATE');
        this.words = words;
        this._svgContent.remove();
        this._init(words)
    };

    _init = (words) => {
        this._svgContent = this.svg.append("g");

        const layout = this._createLayout();
        layout.words(words);
        layout.start().start(); // needs double start for some reason
    };

    _createLayout = () => {
        return d3Cloud().timeInterval(Infinity)
            .size([this._width, this._height])
            .font('impact')
            .spiral('archimedean')
            .fontSize((d) => {
                return this._calculateFontSize(d.importance);
            })
            .text(Word.getWord)
            .on("end", this._draw);
    };

    _draw = (data, bounds) => {
        console.log('DRAW', 'data example', data[0]);

        this.svg.attr("width", this._width).attr("height", this._height);
        this._svgContent.attr("transform", "translate(" + [this._width / 2, this._height / 2] + ")");

        let text = this._svgContent.selectAll("text").data(data, D3CloudData.text);
        text.transition()
            .duration(1000)
            .attr("transform", D3CloudData.styleTransform)
            .style("font-size", D3CloudData.fontSizePx);
        text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", D3CloudData.styleTransform)
            .style("font-size", D3CloudData.fontSizePx)
            .style("opacity", 1);
        text
            .text(D3CloudData.text)
            .style("font-family", D3CloudData.font)
            .style("fill", this._fillFunction);

        this._svgContent.transition().attr("transform", "translate(" + [this._width / 2, this._height / 2] + ")scale(" + this._calculateScale(bounds) + ")");
    };

    _calculateScale(bounds) {
        return bounds ? Math.min(
            this._width / Math.abs(bounds[1].x - this._width / 2),
            this._width / Math.abs(bounds[0].x - this._width / 2),
            this._height / Math.abs(bounds[1].y - this._height / 2),
            this._height / Math.abs(bounds[0].y - this._height / 2)) / 2 : 1;
    };

    _calculateColorCode = scaleOrdinal(schemeCategory10);

    _calculateFontSize = (importance) => {
        if (this.words.length === 1) {
            return 100;
        }
        const fun = scaleSqrt().range([20, 100])
            .domain([this.words[this.words.length - 1].importance || 1, this.words[0].importance]);
        return fun(importance);
    };

    _fillFunction = (d) => {
        const text = D3CloudData.text(d);
        return this._calculateColorCode(text);
    };
}
