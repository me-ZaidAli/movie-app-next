import { CrewMember, CrewJob } from "./type";

export const filterCrewMembers = (
  crewMembers: Array<CrewMember>,
  rolesToFilterBy: Array<CrewJob>
): Array<CrewMember> => {
  return crewMembers.filter((member) => {
    return rolesToFilterBy.includes(member.job);
  });
};

export const hourMinuteFormat = (minutes: number) => {
  const hours = Math.floor(minutes / 60);

  const remainingMinutes = minutes - hours * 60;

  return `${hours}h ${remainingMinutes}m`;
};
