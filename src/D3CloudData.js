import {Word} from "./Word";

export class D3CloudData extends Word {
    font;
    hasText;
    height;
    padding;
    rotate;
    size;
    style;
    text;
    weight;
    width;
    x;
    x0;
    x1;
    xoff;
    y;
    y0;
    y1;
    yoff;

    static text(data) {
        return data.text.toLowerCase();
    }

    static font(data) {
        return data.font;
    }

    static fontSizePx(data) {
        return data.size + "px";
    }

    static styleTransform(data) {
        return "translate(" + [data.x, data.y] + ")rotate(" + data.rotate + ")";
    }
}