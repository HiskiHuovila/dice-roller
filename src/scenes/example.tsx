import {Circle, makeScene2D, Rect, Scene2D} from '@motion-canvas/2d';
import {all, clamp, createRef, easeInBack, easeInCirc, linear, tween} from '@motion-canvas/core';

export default makeScene2D(function* (view) {
  // Create your animations here

  const outerOrbit = createRef<Circle>();
  const outerPlanet = createRef<Circle>();

  const midOrbit = createRef<Circle>();
  const midPlanet = createRef<Circle>();
  const midPlanetOrbit = createRef<Circle>();

  const centralOrbit = createRef<Circle>();
  const centralOrbitLine = createRef<Circle>();
  const centralPlanet = createRef<Circle>();

  view.add(
    <>
      <Circle ref={outerOrbit} size={1000} fill={'rgba(0,0,0,0)'} stroke={'darkorange'} lineWidth={5}>
        <Circle ref={outerPlanet} size={50} fill={'darkorange'} opacity={1} position={[500,0]}/>
      </Circle>
      <Circle ref={midOrbit} size={666} fill={'rgba(0,0,0,0)'} stroke={'darkorange'} lineWidth={5}>
        <Circle ref={midPlanet} size={50} fill={'darkorange'} opacity={1} position={[-333,0]}/>
        <Circle ref={midPlanetOrbit} size={70} fill={'rgba(0,0,0,0)'} opacity={1} position={[-333,0]} stroke={'darkorange'} lineWidth={5}/>
      </Circle>
      <Circle ref={centralOrbit} size={500} fill={'rgba(0,0,0,0)'}>
        <Circle ref={centralPlanet} size={40} fill={'darkorange'} opacity={1} position={[0,250]}/>
      </Circle>
      <Circle ref={centralOrbitLine} size={500} fill={'rgba(0,0,0,0)'} stroke={'darkorange'} lineWidth={5} lineDash={[10,10]}></Circle>
  </>
  );

  yield* all(
    outerOrbit().rotation(360*4,240,linear),
    midOrbit().rotation(-360*3, 240, linear),
    centralOrbit().rotation(360*2, 240, linear),
  );
});

