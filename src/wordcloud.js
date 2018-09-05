import {scaleOrdinal, schemeCategory10, scaleSqrt, select} from 'd3';
import d3Cloud from 'd3-cloud';

export class WordCloud {

  constructor(words) {
    const w = window.innerWidth, h = window.innerHeight;
    this.fill = scaleOrdinal(schemeCategory10);
    this.fontSize = scaleSqrt().range([10, 100]).domain([+words[words.length - 1].value || 1, +words[0].value]);
    this.layout = d3Cloud().timeInterval(Infinity).size([w, h])
    .fontSize((d) => {
      return this.fontSize(+d.value);
    })
    .text((d) => {
      return d.key;
    })
    .font('impact')
    .spiral('archimedean')
    .on("end", this.draw);

    this.svg = select("#vis").append("svg").attr("width", w).attr("height", h);
    this.vis = this.svg.append("g").attr("transform", "translate(" + [w / 2, h / 2] + ")");

    this.layout.words(words);
    this.layout.start().start();

    this.updateOnToWindowResize();
  }

  updateOnToWindowResize() {
    if (window.attachEvent) {
      window.attachEvent('onresize', this.update);
    }
    else if (window.addEventListener) {
      window.addEventListener('resize', this.update);
    }
  }

  update = () => {
    console.log('UPDATE');
    this.layout.stop().start();
  };

  draw = (data, bounds) => {
    console.log('DRAW', 'data example', data[0], this);
    let w = window.innerWidth,
      h = window.innerHeight;

    this.svg.attr("width", w).attr("height", h);

    this.scale = bounds ? Math.min(
      w / Math.abs(bounds[1].x - w / 2),
      w / Math.abs(bounds[0].x - w / 2),
      h / Math.abs(bounds[1].y - h / 2),
      h / Math.abs(bounds[0].y - h / 2)) / 2 : 1;

    let text = this.vis.selectAll("text")
    .data(data, (d) => {
      return d.text.toLowerCase();
    });
    text
    .transition()
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
      return this.fill(d.text.toLowerCase())
    })
    .text((d) => {
      return d.text;
    });

    this.vis.transition().attr("transform", "translate(" + [w / 2, h / 2] + ")scale(" + this.scale + ")");
  };
}
