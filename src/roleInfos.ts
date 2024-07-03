import charData from "./custom-roles.json";
import vizierImage from "./icons/vizier.png";
import organGrinderImage from "./icons/organgrinder.png";
import knightImage from "./icons/knight.png";
import stewardImage from "./icons/steward.png";
import bootleggerImage from "./icons/bootlegger.png";
import stormCatcherImage from "./icons/stormcatcher.png";
import highPriestessImage from "./icons/highpriestess.png";
import harpyImage from "./icons/harpy.png";
import plagueDoctorImage from "./icons/plaguedoctor.png";
import shugenjaImage from "./icons/shugenja.png";
import ojoImage from "./icons/ojo.png";
import ferryManImage from "./icons/ferryman.png";
import kazaliImage from "./icons/kazali.png";
import gardenerImage from "./icons/gardener.png";

import { useEffect, useState } from "react";

export interface RoleInfo {
  id: string;
  name: string;
  ability: string;
  setup: boolean;
  edition: string;
  firstNightReminder: string;
  otherNightReminder: string;
  reminders: string[];
  remindersGlobal?: string[];
  image?: string;
  imageFilter?: string;

  /** Scaling to apply to the image, if not 1. */
  imageScale?: number;
  whitenifyTokenFilter?: boolean;
}

function applyFixups(roles: RoleInfo[]) {
  function changeRole(roleId: string, editor: (role: RoleInfo) => void) {
    const role = roles.find((r) => r.id === roleId);
    if (!role) {
      return;
    }
    editor(role);
  }

  function setEdition(roleId: string, edition: string) {
    changeRole(roleId, (role) => (role.edition = edition));
  }

  function removeReminders(roleId: string, reminder: string) {
    changeRole(
      roleId,
      (role) => (role.reminders = role.reminders.filter((r) => r !== reminder)),
    );
  }

  function ensureReminders(roleId: string, reminder: string, count: number) {
    changeRole(roleId, (role) => {
      while (role.reminders.filter((r) => r === reminder).length < count) {
        role.reminders.push(reminder);
      }
    });
  }

  // Mephit is replaced with Mezepheles
  roles = roles.filter((r) => r.id !== "mephit");

  // ensureReminders("noble", "Know", 3);
  // removeReminders("noble", "Seen");
  // changeRole("noble", (role) => (role.imageScale = 0.8));

  // ensureReminders("preacher", "No ability", 3);
  // ensureReminders("vigormortis", "Has ability", 3);
  // ensureReminders("vigormortis", "Poisoned", 3);
  // setEdition("legion", "midnight");
  // setEdition("farmer", "greatestshow");
  // setEdition("deusexfiasco", "greatestshow");
  // setEdition("stormcatcher", "greatestshow");
  // setEdition("riot", "garden");

  // ensureReminders("widow", "Known", 1);

  // Useful filters to apply to images from the
  // script editor, to produce suitably coloured
  // + outlined images for tokens
  const goodScriptImageFilter =
    "hue-rotate(17deg) saturate(1500%) brightness(90%) drop-shadow(1px 1px 1px rgb(255 255 255 / 0.9))";
  const evilScriptImageFilter =
    "hue-rotate(5deg) saturate(1500%) brightness(45%) drop-shadow(1px 1px 1px rgb(255 255 255 / 0.9))";

  const goodWikiImageFilter = "hue-rotate(18deg)";
  const evilWikiImageFilter = "hue-rotate(5deg) saturate(160%)";
  // changeRole("widow", (r) => (r.imageFilter = evilWikiImageFilter));

  ////////////////////////////////
  //          Townsfolk         //
  ////////////////////////////////
  // roles.push({
  //   id: "investigator",
  //   name: "Investigator",
  //   ability: "You start knowing that 1 of 2 players is a particular Minion.",
  //   setup: false,
  //   edition: "",
  //   firstNightReminder: "Show the character token of a Minion in play. Point to two players, one of which is that character.",
  //   otherNightReminder: "",
  //   reminders: ["Know", "Know"],
  //   image: knightImage,
  //   imageFilter: goodWikiImageFilter,
  //   whitenifyTokenFilter: true,
  //   //imageFilter:
  //   //      "hue-rotate(17deg) saturate(1500%) brightness(90%) drop-shadow(1px 1px 1px rgb(255 255 255 / 0.9))"
  // });

  // roles.push({
  //   id: "knight",
  //   name: "Knight",
  //   ability: "You start knowing 2 players that are not the Demon.",
  //   setup: false,
  //   edition: "",
  //   firstNightReminder: "Point to 2 players which are not the Demon.",
  //   otherNightReminder: "",
  //   reminders: ["Know", "Know"],
  //   image: knightImage,
  //   imageFilter: goodWikiImageFilter,
  //   whitenifyTokenFilter: true,
  //   //imageFilter:
  //   //      "hue-rotate(17deg) saturate(1500%) brightness(90%) drop-shadow(1px 1px 1px rgb(255 255 255 / 0.9))"
  // });

  // roles.push({
  //   id: "highpriestess",
  //   name: "High Priestess",
  //   ability:
  //     "Each night, learn which player the Storyteller believes you should talk to most.",
  //   setup: false,
  //   edition: "",
  //   firstNightReminder: "Point to a player.",
  //   otherNightReminder: "Point to a player.",
  //   reminders: [],
  //   image: highPriestessImage,
  //   imageFilter: goodWikiImageFilter,
  //   imageScale: 1.8,
  // });

  // roles.push({
  //   id: "shugenja",
  //   name: "Shugenja",
  //   setup: false,
  //   edition: "",
  //   firstNightReminder: "Indicate direction of closest evil player.",
  //   otherNightReminder: "",
  //   reminders: ["Clockwise", "Anticlockwise"],
  //   ability:
  //     "You start knowing if your closest evil player is clockwise or anti-clockwise. If equidistant, this info is arbitrary.",
  //   image: shugenjaImage,
  //   imageScale: 1.3,
  //   imageFilter: goodWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  // roles.push({
  //   id: "steward",
  //   name: "Steward",
  //   ability: "You start knowing 1 good player.",
  //   setup: false,
  //   edition: "",
  //   firstNightReminder: "Point to 1 player who is good",
  //   otherNightReminder: "",
  //   reminders: ["Know"],
  //   image: stewardImage,
  //   imageScale: 1.2,
  //   imageFilter: goodWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  ////////////////////////////////
  //          Outsiders         //
  ////////////////////////////////
  // roles.push({
  //   id: "plaguedoctor",
  //   setup: false,
  //   edition: "",
  //   name: "Plague Doctor",
  //   firstNightReminder: "",
  //   otherNightReminder: "Bring minion into play if died today",
  //   reminders: ["Storyteller Ability"],
  //   ability: "If you die, the Storyteller gains a not-in-play Minion ability.",
  //   image: plagueDoctorImage,
  //   imageScale: 0.9,
  //   imageFilter: goodWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  // ////////////////////////////////
  // //           Minions          //
  // ////////////////////////////////
  // roles.push({
  //   id: "harpy",
  //   setup: false,
  //   edition: "",
  //   name: "Harpy",
  //   firstNightReminder: "Pick 2",
  //   otherNightReminder: "Pick 2",
  //   reminders: ["Mad", "2nd"],
  //   ability:
  //     "Each night, choose 2 players: tomorrow, the 1st player is mad that the 2nd is evil, or both might die.",
  //   image: harpyImage,
  //   imageScale: 1.2,
  //   imageFilter: evilWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  // roles.push({
  //   id: "organgrinder",
  //   name: "Organ Grinder",
  //   firstNightReminder: "",
  //   otherNightReminder: "",
  //   reminders: ["About to Die"],
  //   setup: false,
  //   edition: "",
  //   ability:
  //     "All players keep their eyes closed when voting & the vote tally is secret. Votes for you only count if you vote.",
  //   image: organGrinderImage,
  //   imageScale: 1.2,
  //   imageFilter: evilWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  // roles.push({
  //   id: "vizier",
  //   name: "Vizier",
  //   firstNightReminder: "",
  //   otherNightReminder: "",
  //   reminders: [],
  //   setup: false,
  //   edition: "",
  //   ability:
  //     "All players know who you are. You can not die during the day. If good voted, you may choose to execute immediately.",
  //   image: vizierImage,
  //   imageScale: 1.2,
  //   imageFilter: evilWikiImageFilter,
  // });

  ////////////////////////////////
  //            Demons          //
  ////////////////////////////////
  // roles.push({
  //   id: "fanggu",
  //   name: "Fang Gu",
  //   firstNightReminder: "",
  //   otherNightReminder:
  //     "The Fang Gu points to a player. That player dies. Or, if that player was an Outsider and there are no other Fang Gu in play: The Fang Gu dies instead of the chosen player. The chosen player is now an evil Fang Gu. Wake the new Fang Gu. Show the 'You are' card, then the Fang Gu token. Show the 'You are' card, then the thumb-down 'evil' hand sign.",
  //   reminders: ["Dead"],
  //   setup: false,
  //   edition: "",
  //   ability:
  //     "Each night*, choose a player: they die. The 1st Outsider this kills becomes an evil Fang Gu & you die instead. [+1 Outsider]",
  //   image: ojoImage,
  //   imageScale: 1.2,
  //   imageFilter: evilWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  // roles.push({
  //   id: "kazali",
  //   name: "Kazali",
  //   firstNightReminder: "Minion",
  //   otherNightReminder: "Dead",
  //   reminders: ["Minion", "Minion", "Minion", "Minion", "Dead"],
  //   setup: true,
  //   edition: "",
  //   ability:
  //     "Each night*, choose a player: they die. [You choose which players are which Minions. -? to +? Outsiders]",
  //   image: kazaliImage,
  //   imageScale: 1.3,
  //   imageFilter: evilWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  // roles.push({
  //   id: "ojo",
  //   name: "Ojo",
  //   firstNightReminder: "",
  //   otherNightReminder: "Dead",
  //   reminders: ["Dead"],
  //   setup: false,
  //   edition: "",
  //   ability:
  //     "Each night*, choose a character: they die. If they are not in play, the Storyteller chooses who dies.",
  //   image: ojoImage,
  //   imageScale: 1.2,
  //   imageFilter: evilWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  // roles.push({
  //   id: "vigormortis",
  //   name: "Vigormortis",
  //   firstNightReminder: "",
  //   otherNightReminder: "The Vigormortis points to a player. That player dies. If a Minion, they keep their ability and one of their Townsfolk neighbours is poisoned.",
  //   reminders: ["Dead", "Has ability", "Poisoned"],
  //   setup: false,
  //   edition: "",
  //   ability:
  //     "Each night*, choose a player: they die. Minions you kill keep their ability & poison 1 Townsfolk neighbour. [−1 Outsider]",
  //   image: ojoImage,
  //   imageScale: 1.2,
  //   imageFilter: evilWikiImageFilter,
  //   whitenifyTokenFilter: true,
  // });

  ////////////////////////////////
  //         Travellers         //
  ////////////////////////////////

  ////////////////////////////////
  //           Fabled           //
  ////////////////////////////////
  // roles.push({
  //   id: "bootlegger",
  //   firstNightReminder: "",
  //   otherNightReminder: "",
  //   reminders: [],
  //   setup: false,
  //   name: "Bootlegger",
  //   edition: "fabled",
  //   ability: "This script has homebrew characters or rules.",
  //   image: bootleggerImage,
  // });

  // roles.push({
  //   id: "ferryman",
  //   setup: false,
  //   name: "Ferryman",
  //   edition: "fabled",
  //   firstNightReminder: "",
  //   otherNightReminder: "",
  //   reminders: [],
  //   ability: "On the final day, all dead players regain their vote token.",
  //   image: ferryManImage,
  //   imageScale: 1.5,
  // });

  // roles.push({
  //   id: "gardener",
  //   firstNightReminder: "",
  //   otherNightReminder: "",
  //   reminders: [],
  //   setup: false,
  //   name: "Gardener",
  //   edition: "fabled",
  //   ability: "The Storyteller assigns 1 or more players' characters.",
  //   image: gardenerImage,
  //   imageScale: 1.2,
  // });

  // roles.push({
  //   id: "stormcatcher",
  //   firstNightReminder: "TODO",
  //   otherNightReminder: "",
  //   reminders: ["Safe"],
  //   setup: false,
  //   name: "Storm Catcher",
  //   edition: "fabled",
  //   ability:
  //     "Name a good character. If in play, they can only die by execution, but evil players learn which player it is.",
  //   image: stormCatcherImage,
  // });

  // roles.push({
  //   id: "veiled",
  //   setup: false,
  //   name: "The Veiled",
  //   edition: "fabled",
  //   firstNightReminder: "",
  //   otherNightReminder: "",
  //   reminders: [],
  //   ability:
  //     "Players are not told their characters or alignments. Minion and demon information steps are skipped.",
  //   image: "TODO",
  // });

  // for (const role of roles) {
  //   role.ability =
  //     "i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i i";
  //   role.ability = role.ability + " " + role.ability;
  //   role.ability = role.ability + " " + role.ability;
  //   role.ability = role.ability + " " + role.ability;
  //   role.ability = "*[ " + role.ability + " ]*";
  // }

  return roles;
}

// console.log(charData);

const rolesPromise = fetch(
  // "https://raw.githubusercontent.com/bra1n/townsquare/develop/src/roles.json",
  // "https://raw.githubusercontent.com/chizmw/json-on-the-clocktower/main/data/generated/roles-combined.json",
  // "https://raw.githubusercontent.com/phillyCHEEEEEZ/botc-roles-test/master/custom-roles.json",
  "./custom-roles.json",
)
  .then((response) => response.json())
  .then(applyFixups);

export function getRoleInfo(roleId: string) {
  // const roles = (await rolesPromise) as RoleInfo[];
  const roles = charData as RoleInfo[];
  const role = roles.find((r) => r.id === roleId);
  if (!role) {
    throw new Error(`Cannot find role ${roleId}`);
  }
  return role;
}

export function useRole(roleId: string) {
  const [role, setRole] = useState<RoleInfo | undefined>();

  useEffect(() => {
    async function fetchInfo() {
      // const roleInfo = await getRoleInfo(roleId);
      const roleInfo = getRoleInfo(roleId);
      setRole(roleInfo);
    }

    void fetchInfo();
  }, [roleId]);

  return role;
}

export function getAllRoleIds() {
  // const roles = (await rolesPromise) as RoleInfo[];
  const roles = charData as RoleInfo[];
  return roles.map((r) => r.id);
}
