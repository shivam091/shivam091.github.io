import SpringMorph from "./spring-morph";

export default class CircleMorph extends SpringMorph {
  constructor(circles, config = { stiffness: 0.12, damping: 0.75 }) {
    super(
      circles,
      config,
      el => [ // extract points (cx, cy, r)
        [parseFloat(el.getAttribute("cx")) || 0, parseFloat(el.getAttribute("cy")) || 0],
        [parseFloat(el.getAttribute("r")) || 0, 0], // store radius as x=r, y=0 (dummy y)
      ],
      (el, pointGroups) => { // build attribute
        const [pos, rad] = pointGroups.map(g => g.getState());
        el.setAttribute("cx", pos.x.toFixed(2));
        el.setAttribute("cy", pos.y.toFixed(2));
        el.setAttribute("r", rad.x.toFixed(2)); // use x as radius
      }
    );
  }
}
