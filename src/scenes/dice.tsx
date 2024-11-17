import {Circle, makeScene2D, Polygon, Rect, Scene2D, Txt} from '@motion-canvas/2d';
import {all, chain, clamp, createRef, easeInBack, easeInCirc, easeInElastic, easeOutBack, easeOutBounce, easeOutCubic, easeOutElastic, linear, Random, ThreadGenerator, tween} from '@motion-canvas/core';

const realheight = 160;
export default makeScene2D(function* (view) {
  // Create your animations here

const die = createRef<Polygon>();
const number = createRef<Txt>();

  view.add(
    <Polygon ref={die} sides={3} size={realheight} fill={'lightseagreen'}>
      <Txt ref={number} text={""} fill={"#ffffff"} fontFamily={"Alegreya Sans"} fontWeight={600} fontSize={75} offsetY = {0.125}></Txt>
    </Polygon>
  );

  yield* chain(rollall(die(),number()));
  
});

function* roll(polygon: Polygon, numberText: Txt, finalvalue: string, sides: number): ThreadGenerator
{
  let polygonsides = 0;
  let polygonrotation = 0;
  let polygonheight = 1.0;
  let polygoncolors = ["#e8f2ff", "#ad7c3b", "#ffab47", "#34f09b", "#839bcd", "#d11b5a"]
  let polygoncolor = "";

  switch (sides) {
    case 4:
        polygonsides = 3;
        polygoncolor = polygoncolors[0];
        break;
    case 6:
        polygonsides = 4;
        polygonrotation = 45;
        polygoncolor = polygoncolors[1];
        break;
    case 8:
        polygonsides = 4;
        polygonheight = 1.1;
        polygoncolor = polygoncolors[2];
        break;
    case 10:
        polygonsides = 4;
        polygonheight = 0.9;
        polygoncolor = polygoncolors[3];
        break;
    case 12:
        polygonsides = 6;
        polygonrotation = 90;
        polygoncolor = polygoncolors[4];
        break;
    case 20:
          polygonsides = 6;
          polygoncolor = polygoncolors[5];
          break;
    default:
        console.log('Unknown fruit');
}
  
  yield * all(
    polygon.sides(polygonsides,0),
    polygon.fill(polygoncolor,0),
    polygon.height(polygon.height() * polygonheight,0),
    polygon.rotation(360 + polygonrotation,2,easeOutElastic),
    numberText.rotation(-polygonrotation,0),
    numberText.text(finalvalue,1)
  );
  yield* all(
    polygon.height(realheight,0),
    polygon.rotation(0,0),
    numberText.rotation(0,0),
    numberText.text("",0)
  )
}

function* rollall(polygon: Polygon, numberText: Txt): ThreadGenerator
{
  const generators = [];
  const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const sideslist = [4,6,8,10,12,20];
  
  for (let sides of sideslist) {
    for(let num of numbers)
    {
      if(num <= sides)
      {
        generators.push(roll(polygon,numberText,num.toString(),sides));
      }
    }
  }
// Run all of the generators.
  yield * chain(...generators);
}
