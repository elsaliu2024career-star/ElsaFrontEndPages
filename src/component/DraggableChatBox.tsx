import React, { useState, useRef, useEffect } from "react";

export default function DraggableChatBox({ children }: { children: React.ReactNode }) {
  const boxRef = useRef<HTMLDivElement>(null);

  const [pos, setPos] = useState({ x: 100, y: 100 });
  const [dragging, setDragging] = useState(false);
  const [rel, setRel] = useState({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return; // Only left click
    if (!boxRef.current) return;

    const rect = boxRef.current.getBoundingClientRect();
    setDragging(true);
    setRel({
      x: e.pageX - rect.left,
      y: e.pageY - rect.top,
    });

    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseUp = (e: MouseEvent) => {
    setDragging(false);
    e.stopPropagation();
    e.preventDefault();
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPos({
      x: e.pageX - rel.x,
      y: e.pageY - rel.y,
    });
    e.stopPropagation();
    e.preventDefault();
  };

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, rel]);

  return (
    <div
      ref={boxRef}
      onMouseDown={onMouseDown}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        cursor: dragging ? "grabbing" : "grab",
        userSelect: "none",
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  );
}
