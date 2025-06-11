import { createAnimatable, utils } from "animejs";

const [$clock] = utils.$(".clock");
let bounds = $clock.getBoundingClientRect();
const refreshBounds = () => (bounds = $clock.getBoundingClientRect());

const clock = createAnimatable($clock, {
  rotate: { unit: "rad" }, // Set the unit to 'rad'
  duration: 400,
});

const { PI } = Math;
let lastAngle = 0;
let angle = PI / 2;

const onMouseMove = (e) => {
  const { width, height, left, top } = bounds;
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;
  const currentAngle = Math.atan2(y, x);
  const diff = currentAngle - lastAngle;
  angle += diff > PI ? diff - 2 * PI : diff < -PI ? diff + 2 * PI : diff;
  lastAngle = currentAngle;
  clock.rotate(angle); // Pass the new angle value in rad
};

window.addEventListener("mousemove", onMouseMove);
