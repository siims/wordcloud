import _ from 'lodash';
import {WordCloud} from "./wordcloud";

function component() {
  let element = document.createElement('div');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());



var tags = [{"key": "Cat", "value": 26}, {"key": "fish", "value": 19}, {
  "key": "things",
  "value": 50
}, {"key": "look", "value": 16}, {"key": "two", "value": 15}, {
  "key": "like",
  "value": 14
}, {"key": "hat", "value": 14}, {"key": "Oh", "value": 13}, {
  "key": "mother",
  "value": 12
}, {"key": "One", "value": 12}, {"key": "Now", "value": 12}, {
  "key": "Thing",
  "value": 12
}, {"key": "house", "value": 10}, {"key": "fun", "value": 9}, {
  "key": "know",
  "value": 9
}, {"key": "good", "value": 9}, {"key": "saw", "value": 9}, {
  "key": "bump",
  "value": 8
}, {"key": "hold", "value": 7}, {"key": "fear", "value": 6}, {
  "key": "game",
  "value": 6
}, {"key": "play", "value": 6}, {"key": "Sally", "value": 6}, {
  "key": "wet",
  "value": 6
}, {"key": "little", "value": 6}, {"key": "box", "value": 6}, {
  "key": "came",
  "value": 6
}, {"key": "away", "value": 6}, {"key": "sit", "value": 5}, {
  "key": "ran",
  "value": 5
}, {"key": "big", "value": 5}, {"key": "something", "value": 5}, {
  "key": "put",
  "value": 5
}, {"key": "wish", "value": 4}, {"key": "day", "value": 4}, {
  "key": "new",
  "value": 4
}, {"key": "tricks", "value": 4}, {"key": "way", "value": 4}, {
  "key": "sat",
  "value": 4
}, {"key": "books", "value": 3}, {"key": "hook", "value": 3}, {
  "key": "mess",
  "value": 3
}, {"key": "kites", "value": 3}, {"key": "rake", "value": 3}, {
  "key": "red",
  "value": 3
}, {"key": "shame", "value": 3}, {"key": "bit", "value": 3}, {
  "key": "hands",
  "value": 3
}, {"key": "gown", "value": 3}, {"key": "call", "value": 3}, {
  "key": "cold",
  "value": 3
}, {"key": "fall", "value": 3}, {"key": "milk", "value": 3}, {
  "key": "shook",
  "value": 3
}, {"key": "tame", "value": 2}, {"key": "deep", "value": 2}, {
  "key": "Sank",
  "value": 2
}, {"key": "head", "value": 2}, {"key": "back", "value": 2}, {
  "key": "fell",
  "value": 2
}, {"key": "sun", "value": 2}, {"key": "asked", "value": 1}, {
  "key": "shine",
  "value": 1
}, {"key": "mind", "value": 1}, {"key": "bite", "value": 1}, {
  "key": "step",
  "value": 1
}, {"key": "mat", "value": 1}, {"key": "gave", "value": 1}, {
  "key": "pat",
  "value": 1
}];


let wordCloud = new WordCloud(tags);
