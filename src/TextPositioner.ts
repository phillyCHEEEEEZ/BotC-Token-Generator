import { useMemo, useRef, useState } from "react";

function createCanvasElement() {
  return document.createElement("canvas");
}

function getWidthAtY(y: number, circleRadius: number) {
  const heightAboveCentre = circleRadius - y;
  // heightAboveCentre / width == tan(theta)
  // width / radius = cos(theta)
  const theta = Math.asin(heightAboveCentre / circleRadius);
  const width = (2 * heightAboveCentre) / Math.tan(theta);
  return width;
}

export interface Line {
  x: number;
  y: number;
  text: string;
}

export interface TextPositioningParams {
  text: string;
  circleDiameter: number;
  fontFamily: string;
  fontSize: number;
  yStart: number;
  yMax?: number;
  margin: number;
  extraMargin?: (y: number) => number;
}

export interface TextPositioningOutput {
  lines: Line[];
  fontSize: number;
}

export function useTextPositioning({
  text,
  circleDiameter,
  fontFamily,
  fontSize,
  yStart,
  yMax = Infinity,
  margin,
  extraMargin
}: TextPositioningParams): TextPositioningOutput {
  const [canvas] = useState<HTMLCanvasElement>(createCanvasElement);

  const info = useMemo<TextPositioningOutput>(() => {
    if (!text) {
      return { lines: [], fontSize };
    }

    let trialFontSize = fontSize;

    let successful = false;
    let output: Line[] = [];

    do {
      successful = true;

      output = [];

      const context = canvas.getContext("2d")!;
      context.font = `${trialFontSize}px ${fontFamily}`;

      const circleRadius = circleDiameter / 2;

      const words = text.split(/ /);
      let currentLine: Line | undefined;

      let previousText = "";

      let y = margin + yStart;

      for (var i = 0; i < words.length; i++) {
        let word = words[i];
        const newlineBeforeWord = word.startsWith("\n");
        if (newlineBeforeWord) {
          word = word.slice(1);
        }
        let currentText = previousText ? previousText + " " + word : word;
        let width: number;
        if (newlineBeforeWord && previousText) {
          // Force newline before this word
          width = Infinity;
        } else {
          width = context.measureText(currentText).width;
        }
        const extraMarginPx = extraMargin ? extraMargin(y) : 0;

        const maxWidth = getWidthAtY(
          y - (margin + extraMarginPx),
          circleRadius - margin
        );
        if (isNaN(maxWidth) || y > yMax) {
          if (fontSize > 4) {
            // Doesn't fit. Try with a smaller font.
            successful = false;
            trialFontSize = trialFontSize - 0.5;
            break;
          }
        }

        if (width <= maxWidth) {
          currentLine = {
            x: (circleDiameter - width) / 2,
            y: y,
            text: currentText
          };
          previousText = currentText;
        } else {
          previousText = "";
          if (currentLine) {
            output.push(currentLine);
            y += trialFontSize;
          }
          i--;
        }
      }

      if (currentLine) {
        output.push(currentLine);
      }
    } while (!successful);

    return {
      fontSize: trialFontSize,
      lines: output
    };
  }, [
    canvas,
    text,
    circleDiameter,
    fontFamily,
    fontSize,
    margin,
    yStart,
    yMax
  ]);

  return info;
}
