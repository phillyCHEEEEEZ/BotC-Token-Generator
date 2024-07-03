import React, { useEffect, useState, cloneElement } from "react";

interface BasicLeavesProps extends React.SVGProps<SVGImageElement> {
  count: number;
}

function BasicLeaves(props: BasicLeavesProps) {
  const { count, ...propsRest } = props;

  return (
    <image
      {...propsRest}
      x="0"
      y="0"
      width="150"
      height="150"
      xlinkHref={`https://github.com/RoystonS/townsquare/blob/main/src/assets/leaf-top${count}.png?raw=true`}
    />
  );
}
export interface TopLeavesProps {
  count: number;
}

export function TopLeaves(props: TopLeavesProps) {
  const { count } = props;

  if (count <= 5) {
    return <BasicLeaves count={count} />;
  }

  function twoLeaves(rotate: number) {
    const css: React.CSSProperties = {
      clipPath: "inset(0 54% 0 0)"
    };
    if (rotate > 0) {
      css.transform = `rotate(${rotate}deg) scaleX(-1)`;
    } else if (rotate < 0) {
      css.transform = `rotate(${rotate}deg)`;
    }
    if (css.transform) {
      css.transformOrigin = "50% 50%";
    }

    return <BasicLeaves style={css} count={5} />;
  }

  let rotateLeft, rotateRight;
  switch (count) {
    case 6:
      rotateLeft = -10;
      rotateRight = +14;
      break;
    case 7:
      rotateLeft = -20;
      rotateRight = +18;
      break;
    default:
      throw new Error(`Count not supported: ${count}`);
  }

  const leftmostTwoLeaves = twoLeaves(rotateLeft);
  const rightmostTwoLeaves = twoLeaves(rotateRight);
  const middleLeaves = <BasicLeaves count={count - 4} />;

  return (
    <>
      {leftmostTwoLeaves}
      {middleLeaves}
      {rightmostTwoLeaves}
    </>
  );
}
