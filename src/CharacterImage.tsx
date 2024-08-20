import { useRole } from "./roleInfos";

export interface CharacterImageProps {
  roleId: string;
  iconSize: number;
  extraFilter?: string;
  yOffset?: number;
}

export function CharacterImage(props: CharacterImageProps) {
  let { roleId, iconSize, yOffset = 0, extraFilter = "" } = props;

  const role = useRole(roleId);

  let filter = extraFilter;
  let transform = "";

  if (role?.imageFilter) {
    filter = filter + " " + role.imageFilter;
  }

  iconSize = iconSize * (role?.imageScale ?? 1);

  let xlinkHref;
  let x, y, width, height;

  const useOfficialImages = false;
  const useAlternateImages = false;

  if (role?.image && useOfficialImages) { 
    xlinkHref = role.image;
    x = -12 + (177 - (iconSize * 4) / 5) / 2;
    y = yOffset + 24 + (124 - (iconSize * 4) / 5) / 2;
    width = (iconSize * 4) / 5;
    height = (iconSize * 4) / 5;
  } else if (useAlternateImages) {
    xlinkHref = `https://raw.githubusercontent.com/chizmw/json-on-the-clocktower/main/data/images/${roleId}.png`;
    x = 15 + (120 - (iconSize * 4) / 5) / 2;
    y = yOffset + 34 + (120 - (iconSize * 4) / 5) / 2;
    width = (iconSize * 4) / 5;
    height = (iconSize * 4) / 5;
  } else {
    xlinkHref = `https://raw.githubusercontent.com/phillyCHEEEEEZ/BotC-Token-Generator/master/src/icons/${roleId}.png`;
    x = 15 + (120 - (iconSize * 4) / 6) / 2;
    y = yOffset + 26 + (120 - (iconSize * 4) / 6) / 2;
    width = (iconSize * 4) / 6;
    height = (iconSize * 4) / 6;
  }

  return (
    <image
      x={x}
      y={y}
      width={width}
      height={height}
      filter={filter}
      transform={transform}
      xlinkHref={xlinkHref}
    />
  );
}