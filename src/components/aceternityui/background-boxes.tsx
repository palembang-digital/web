"use client";

import { room } from "@/instantdb";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

export const BoxesCore = ({ className, ...rest }: { className?: string }) => {
  const { user: myPresence, peers, publishPresence } = room.usePresence();

  const [boxesColor, setBoxesColor] = React.useState<Record<string, string>>(
    {}
  );
  useEffect(() => {
    let boxes = {};
    for (const peerId in peers) {
      const peer = peers[peerId];
      if (peerId === myPresence?.peerId) {
        continue;
      }
      if (peer.color) {
        boxes = {
          ...boxes,
          [`${peer.row}-${peer.col}`]: peer.color,
        };
      }
    }
    setBoxesColor(boxes);
  }, [peers, myPresence?.peerId]);

  const rows = new Array(150).fill(1);
  const cols = new Array(21).fill(1);
  let colors = [
    "--sky-300",
    "--pink-300",
    "--green-300",
    "--yellow-300",
    "--red-300",
    "--purple-300",
    "--blue-300",
    "--indigo-300",
    "--violet-300",
  ];
  const getRandomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <>
      <div
        style={{
          transform: `translate(-40%, -60%) skewX(-48deg) skewY(14deg) scale(0.675) rotate(0deg) translateZ(0)`,
        }}
        className={cn(
          "absolute left-1/4 p-4 -top-1/4 flex -translate-x-1/2 -translate-y-1/2",
          className
        )}
        {...rest}
      >
        {rows.map((_, i) => (
          <motion.div
            key={`row` + i}
            className="w-16 h-8 border-l border-slate-200 relative"
          >
            {cols.map((_, j) => (
              <motion.div
                whileHover={{
                  backgroundColor: `var(${getRandomColor()})`,
                  transition: { duration: 0 },
                }}
                whileTap={{
                  scale: 1.5,
                  zIndex: 1,
                }}
                animate={{
                  backgroundColor: boxesColor[`${i}-${j}`] || "rgba(0 0 0 0)",
                  transition: { duration: 0.3 },
                }}
                onHoverStart={() => {
                  publishPresence({
                    row: i,
                    col: j,
                    color: `var(${getRandomColor()})`,
                  });
                }}
                onHoverEnd={() => {
                  publishPresence({
                    row: i,
                    col: j,
                    color: "rgba(0 0 0 0)",
                  });
                }}
                key={`col` + j}
                className="w-16 h-8 border-r border-t border-slate-200 relative"
              >
                {j % 2 === 0 && i % 2 === 0 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="absolute h-6 w-10 -top-[14px] -left-[22px] text-slate-200 stroke-[1px] pointer-events-none"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                ) : null}
              </motion.div>
            ))}
          </motion.div>
        ))}
      </div>
    </>
  );
};

export const Boxes = React.memo(BoxesCore);
