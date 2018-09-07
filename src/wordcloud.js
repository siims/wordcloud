import {create, scaleOrdinal, scaleSqrt, schemeCategory10} from 'd3';
import d3Cloud from 'd3-cloud';

export class WordCloud {

    constructor(words, width, height) {
        this._width = width;
        this._height = height;
        this._calculateColorCode = scaleOrdinal(schemeCategory10);
        this._calculateFontSize = scaleSqrt().range([10, 100]).domain([+words[words.length - 1].importance || 1, +words[0].importance]);
        this._layout = d3Cloud().timeInterval(Infinity).size([this._width, this._height])
            .fontSize((d) => {
                return this._calculateFontSize(d.importance);
            })
            .text((d) => {
                return d.word;
            })
            .font('impact')
            .spiral('archimedean')
            .on("end", this._draw);

        this.svg = create("svg").attr("width", this._width).attr("height", this._height);
        this._svgContent = this.svg.append("g");

        this.update(words);
    }

    getElement = () => {
        return this.svg._groups[0][0];
    };

    update = (words) => {
        console.log('UPDATE');
        this._svgContent.remove();
        this._svgContent = this.svg.append("g");
        this._layout.stop();
        if (words != null) {
            this._layout.words(words);
        }
        this._layout.start().start(); // needs double start for some reason
    };

    _draw = (data, bounds) => {
        console.log('DRAW', 'data example', data[0], this);

        this.svg.attr("width", this._width).attr("height", this._height);

        const scale = bounds ? Math.min(
            this._width / Math.abs(bounds[1].x - this._width / 2),
            this._width / Math.abs(bounds[0].x - this._width / 2),
            this._height / Math.abs(bounds[1].y - this._height / 2),
            this._height / Math.abs(bounds[0].y - this._height / 2)) / 2 : 1;

        this._svgContent.attr("transform", "translate(" + [this._width / 2, this._height / 2] + ")");

        let text = this._svgContent.selectAll("text")
            .data(data, (d) => {
                return d.text.toLowerCase();
            });
        text.transition()
            .duration(1000)
            .attr("transform", (d) => {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", (d) => {
                return d.size + "px";
            });
        text.enter().append("text")
            .attr("text-anchor", "middle")
            .attr("transform", (d) => {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .style("font-size", (d) => {
                return d.size + "px";
            })
            .style("opacity", 1);
        text.style("font-family", (d) => {
            return d.font;
        })
            .style("fill", (d) => {
                return this._calculateColorCode(d.text.toLowerCase())
            })
            .text((d) => {
                return d.text;
            });

        this._svgContent.transition().attr("transform", "translate(" + [this._width / 2, this._height / 2] + ")scale(" + scale + ")");
    };
}
