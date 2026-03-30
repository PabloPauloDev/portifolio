"use client";

import { useEffect, useRef, useCallback } from "react";
import Matter from "matter-js";

const BADGE_RADIUS = 28;
const RECT_W = 72;
const RECT_H = 48;
const WALL_THICKNESS = 60;

interface BodyState { x: number; y: number; angle: number; }

export function usePhysicsEngine(shapes: Array<"hexagon" | "rectangle">) {
  const engineRef = useRef<Matter.Engine | null>(null);
  const bodiesRef = useRef<Matter.Body[]>([]);
  const rafRef = useRef(0);
  const statesRef = useRef<BodyState[]>([]);
  const onUpdateRef = useRef<(() => void) | null>(null);
  const dragCbRef = useRef<((g: boolean) => void) | null>(null);
  const domBodiesRef = useRef<Matter.Body[]>([]);
  const setOnUpdate = useCallback((fn: () => void) => { onUpdateRef.current = fn; }, []);
  const getStates = useCallback(() => statesRef.current, []);
  const setOnDragChange = useCallback((fn: (g: boolean) => void) => { dragCbRef.current = fn; }, []);

  useEffect(() => {
    if (shapes.length === 0) return;
    const { Engine, Runner, Bodies, Composite, Mouse, MouseConstraint, Events } = Matter;
    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    const runner = Runner.create();
    engineRef.current = engine;
    const w = window.innerWidth, h = window.innerHeight;
    const floor      = Bodies.rectangle(w / 2, h + WALL_THICKNESS / 2, w * 2, WALL_THICKNESS, { isStatic: true });
    const leftWall   = Bodies.rectangle(-WALL_THICKNESS / 2, h / 2, WALL_THICKNESS, h * 3, { isStatic: true });
    const rightWall  = Bodies.rectangle(w + WALL_THICKNESS / 2, h / 2, WALL_THICKNESS, h * 3, { isStatic: true });
    Composite.add(engine.world, [floor, leftWall, rightWall]);
    const bodies: Matter.Body[] = shapes.map((shape, i) => {
      const x = (w / (shapes.length + 1)) * (i + 1) + (Math.random() - 0.5) * 40;
      const y = -(BADGE_RADIUS + 80 + Math.random() * 200);
      const opts = { restitution: 0.4, friction: 0.3, frictionAir: 0.01, density: 0.002, label: shape };
      return shape === "hexagon"
        ? Bodies.polygon(x, y, 6, BADGE_RADIUS, { ...opts, angle: -Math.PI / 2 })
        : Bodies.rectangle(x, y, RECT_W, RECT_H, opts);
    });
    bodiesRef.current = bodies;
    Composite.add(engine.world, bodies);
    const mouse = Mouse.create(document.createElement("div"));
    const mc = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    Composite.add(engine.world, mc);
    const onMv = (e: MouseEvent) => { mouse.position.x = mouse.absolute.x = e.clientX; mouse.position.y = mouse.absolute.y = e.clientY; };
    const onDn = (e: MouseEvent) => { mouse.button = e.button; mouse.mousedownPosition.x = e.clientX; mouse.mousedownPosition.y = e.clientY; onMv(e); };
    const onUp = (e: MouseEvent) => { mouse.button = -1; mouse.mouseupPosition.x = e.clientX; mouse.mouseupPosition.y = e.clientY; };
    window.addEventListener("mousemove", onMv); window.addEventListener("mousedown", onDn); window.addEventListener("mouseup", onUp);
    Events.on(mc, "startdrag", () => dragCbRef.current?.(true));
    Events.on(mc, "enddrag",   () => dragCbRef.current?.(false));
    Runner.run(runner, engine);
    const sync = () => {
      statesRef.current = bodiesRef.current.map(b => ({ x: b.position.x, y: b.position.y, angle: b.angle }));
      onUpdateRef.current?.();
      rafRef.current = requestAnimationFrame(sync);
    };
    rafRef.current = requestAnimationFrame(sync);
    const onResize = () => {
      const nw = window.innerWidth, nh = window.innerHeight;
      Matter.Body.setPosition(floor,     { x: nw / 2,              y: nh + WALL_THICKNESS / 2 });
      Matter.Body.setPosition(rightWall, { x: nw + WALL_THICKNESS / 2, y: nh / 2 });
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMv); window.removeEventListener("mousedown", onDn); window.removeEventListener("mouseup", onUp);
      Runner.stop(runner);
      Engine.clear(engine);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shapes.length]);
  const syncDOMBodies = useCallback((els: Element[]) => {
    const e = engineRef.current; if (!e) return;
    Matter.Composite.remove(e.world, domBodiesRef.current);
    const newBodies = els.map(el => {
      const { left: l, top: t, width: w, height: h } = el.getBoundingClientRect();
      return Matter.Bodies.rectangle(l + w / 2, t + h / 2, w, h, { isStatic: true, restitution: 0.25, friction: 0.3 });
    });
    domBodiesRef.current = newBodies;
    if (newBodies.length) Matter.Composite.add(e.world, newBodies);
  }, []);
  const resetBodies = useCallback(() => {
    const rw = window.innerWidth;
    bodiesRef.current.forEach((body, i) => {
      const rx = (rw / (bodiesRef.current.length + 1)) * (i + 1) + (Math.random() - 0.5) * 60;
      const ry = -(BADGE_RADIUS + 80 + Math.random() * 200);
      Matter.Body.setPosition(body, { x: rx, y: ry });
      Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 3, y: 0 });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.15);
      if (body.label === "hexagon") Matter.Body.setAngle(body, -Math.PI / 2);
    });
  }, []);

  return { getStates, setOnUpdate, resetBodies, setOnDragChange, syncDOMBodies };
}
