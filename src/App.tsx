import "./styles.css";
import AllCharacters from "./scripts/AllCharacters.json";
import Boozling from "./scripts/Boozling.json";
import Catfishing from "./scripts/Catfishing.json";
import Church from "./scripts/Church of Spies.json";
import ExtensionCord from "./scripts/Extension Cord.json";
import Friends from "./scripts/With Friends Like These.json";
import Horrifying from "./scripts/The Horrifying Spectacle of Public Executions.json";
import Midnight from "./scripts/The Midnight Oasis.json";
import Labyrinth from "./scripts/The Minotaur's Labyrinth.json";
import Predicament from "./scripts/Predicament Forthcoming.json";

import { useState, useEffect } from "react";
import { Token } from "./Token";
import { ReminderTokens } from "./ReminderTokens";
import { getAllRoleIds, getRoleInfo, RoleInfo } from "./roleInfos";

function convertCharName(text: string) {
  return text.replaceAll("_", "").replaceAll("-", "");
}

export default function App() {
  const [_allRoleIds, setAllRoleIds] = useState<string[]>([]);
  const [_allRoles, setAllRoles] = useState<RoleInfo[]>([]);

  useEffect(() => {
    async function getRoles() {
      const roleIds = await getAllRoleIds();
      setAllRoleIds(roleIds);
      const roles = await Promise.all(roleIds.map(getRoleInfo));
      setAllRoles(roles);
    }
    void getRoles();
  }, []);

  const allCharacters = false
  const characterTokensOnly = false

  const activeScript = allCharacters ? AllCharacters : Midnight;

  // console.log(activeScript)

  const tokens = activeScript.map((character, i) =>
    character.id === "_meta" ? (
      ""
    ) : characterTokensOnly ? 
      (
        <text key={i}>
          <Token
            key={convertCharName(character.id) + "-charactertoken"}
            roleId={convertCharName(character.id)}
          />
        </text>
      ) :
      (
        <text key={i}>
          <Token
            key={convertCharName(character.id) + "-charactertoken"}
            roleId={convertCharName(character.id)}
          />
          <ReminderTokens
            key={convertCharName(character.id) + "-remindertokens"}
            roleId={convertCharName(character.id)}
          />
        </text>
      ),
  );

  return (
    <div className="App" style={{ verticalAlign: "top" }}>
      {tokens}
    </div>
  );
}

// const CharacterCard = ({ character }) => {
//   const { name, ability, reminders, remote_image } = character;

//   return (
//     <div className="character-card">
//       <h2>{name}</h2>
//       <p>{ability}</p>
//       <p>{reminders}</p>
//       <img src={remote_image} alt={`${name}`} />
//     </div>
//   );
// };

// const App = () => {
//   const characters = [{
//     "ability": "You start knowing a good player & their character. If the Demon kills them, you die too.",
//     "edition": "bmr",
//     "firstNight": 44,
//     "firstNightReminder": "Show the marked character token. Point to the marked player.",
//     "id": "grandmother",
//     "name": "Grandmother",
//     "otherNight": 58,
//     "otherNightReminder": "If the Grandmother's grandchild was killed by the Demon tonight: The Grandmother dies.",
//     "reminders": [
//       "Grandchild"
//     ],
//     "remote_image": "https://raw.githubusercontent.com/chizmw/json-on-the-clocktower/main/data/images/grandmother.png",
//     "setup": false,
//     "team": "townsfolk"
//   },
//   {
//     "ability": "Each day, after the 1st vote has been tallied, you may choose a player that voted: they die.",
//     "edition": "tb",
//     "firstNight": null,
//     "firstNightReminder": null,
//     "id": "gunslinger",
//     "name": "Gunslinger",
//     "otherNight": null,
//     "otherNightReminder": null,
//     "reminders": [],
//     "remote_image": "https://raw.githubusercontent.com/chizmw/json-on-the-clocktower/main/data/images/gunslinger.png",
//     "setup": false,
//     "team": "traveler"
//   }];

//   return (
//     <div>
//       {characters.map((char) => (
//         <CharacterCard key={char.id} character={char} />
//       ))}
//     </div>
//   );
// };

// export default App;
