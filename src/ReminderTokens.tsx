import { useEffect, useState } from "react";

import { getRoleInfo, RoleInfo } from "./roleInfos";
import { ReminderToken } from "./ReminderToken";

export interface ReminderTokensProps {
  roleId: string;
}

export function ReminderTokens({ roleId }: ReminderTokensProps) {
  const [role, setRole] = useState<RoleInfo | undefined>();

  useEffect(() => {
    async function fetchInfo() {
      const roleInfo = await getRoleInfo(roleId);
      setRole(roleInfo);
    }

    void fetchInfo();
  }, [roleId]);

  const reminders = role?.reminders ?? [];
  const remindersGlobal = role?.remindersGlobal ?? [];

  const allReminders = reminders.concat(remindersGlobal);

  // console.log(allReminders)

  const tokens = allReminders.map((reminder, i) => (
    <ReminderToken key={i} roleId={roleId} text={"  " + reminder} />
  ));

  // const tokensLog = allReminders.map((reminder, i) =>
  //   console.log(i, roleId, reminder),
  // );

  return <>{tokens}</>;
}
