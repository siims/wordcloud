import {WordCloud} from "./wordcloud";
import {Word} from "./Word";
import jquery from "jquery";

const data = [new Word("things", 50), new Word("Cat", 26), new Word("fish", 19),
    new Word("look", 16), new Word("two", 15), new Word("like", 14),
    new Word("hat", 14), new Word("Oh", 13), new Word("mother", 12),
    new Word("One", 12), new Word("Now", 12), new Word("Thing", 12),
    new Word("house", 10), new Word("fun", 9), new Word("know", 9),
    new Word("good", 9), new Word("saw", 9), new Word("bump", 8),
    new Word("hold", 7), new Word("fear", 6), new Word("game", 6),
    new Word("play", 6), new Word("Sally", 6), new Word("wet", 6),
    new Word("little", 6), new Word("box", 6), new Word("came", 6),
    new Word("away", 6), new Word("sit", 5), new Word("ran", 5),
    new Word("big", 5), new Word("something", 5), new Word("put", 5),
    new Word("wish", 4), new Word("day", 4), new Word("new", 4),
    new Word("tricks", 4), new Word("way", 4), new Word("sat", 4),
    new Word("books", 3), new Word("hook", 3), new Word("mess", 3),
    new Word("kites", 3), new Word("rake", 3), new Word("red", 3),
    new Word("shame", 3), new Word("bit", 3), new Word("hands", 3),
    new Word("gown", 3), new Word("call", 3), new Word("cold", 3),
    new Word("fall", 3), new Word("milk", 3), new Word("shook", 3),
    new Word("tame", 2), new Word("deep", 2), new Word("Sank", 2),
    new Word("head", 2), new Word("back", 2), new Word("fell", 2),
    new Word("sun", 2), new Word("asked", 1), new Word("shine", 1),
    new Word("mind", 1), new Word("bite", 1), new Word("step", 1),
    new Word("mat", 1), new Word("gave", 1), new Word("pat", 1)
];


const wordCloud = new WordCloud(data, 600, 400);
let slider = createSlider();
slider.className = "slider";
jquery(slider).on("change", function (event) {
        wordCloud.update(data.slice(0, event.target.valueAsNumber));
    }
);
jquery("#visualization").append(slider);
jquery("#visualization").append(wordCloud.getElement());


function createSlider() {
    var newInput = document.createElement("input");
    newInput.type = "range";
    newInput.min = 1;
    newInput.value = data.length;
    newInput.max = data.length;
    return newInput;
}