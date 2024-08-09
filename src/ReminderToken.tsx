import { useTextPositioning } from "./TextPositioner";
import { CharacterImage } from "./CharacterImage";
import { useId } from "react";
import { useRole } from "./roleInfos";
import { getImageForEdition } from "./editionImages";

export interface ReminderTokenProps {
  text: string;
  roleId: string;
}

export function ReminderToken({ text, roleId }: ReminderTokenProps) {
  let fontSize = 26;
  const fontFamily = "Times New Roman";
  const filterId = useId();
  const role = useRole(roleId);

  // console.log(roleId, "-", text)

  const { lines, fontSize: computedFontSize } = useTextPositioning({
    text,
    circleDiameter: 150,
    fontFamily,
    fontSize,
    yStart: 95,
    margin: 20,
  });

  // console.log(lines)

  const lineEls = lines.map((line, i) => (
    <tspan key={i} x={i != 0 ? line.x : line.x - 4} y={line.y}>
      {line.text}
    </tspan>
  ));

  // console.log(roleId, "-", lines)

  // Most images contain lots of transparency.
  // Some newer icons contain white instead,
  // so we map the white in those to transparent.
  const pureBlackWhiteFilter = "saturate(0%) brightness(0%)";
  const mapWhiteToTransparent = `url(#${filterId})`;

  let extraFilter = pureBlackWhiteFilter;
  if (role && role.whitenifyTokenFilter) {
    extraFilter = mapWhiteToTransparent;
  }
  return (
    <div className="reminderToken">
      <svg viewBox="0 0 150 150" className="name">
        <image
          x="0"
          y="0"
          width="150"
          height="150"
          xlinkHref="https://raw.githubusercontent.com/RoystonS/townsquare/main/src/assets/reminder.png"
        />

        <filter id={filterId}>
          <feColorMatrix
            type="matrix"
            values="-5 0 0 0 0
                    0 -5 0 0 0
                    0 0 -5 0 0
                   -3 -3 -3 5 -0.5"
          ></feColorMatrix>
        </filter>

        <CharacterImage
          yOffset={-27}
          roleId={roleId}
          iconSize={110}
          extraFilter={extraFilter}
        />

        <text
          x="0"
          y="48"
          style={{
            fontSize: computedFontSize,
            // fontFamily,
            lineHeight: 1,
            textAlign: "center",
            whiteSpace: "pre",
            display: "inline",
            fill: "#101010",
          }}
          className = "reminderText"
        >
          {lineEls}
        </text>

        {/* <g transform="scale(1.2) translate(-90,-74) ">
          {role ? getImageForEdition(role.edition) : null}
        </g> */}
      </svg>
    </div>
  );
}
