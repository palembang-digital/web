import { getEventsCount, getUsersCount, getVideosCount } from "@/services";
import { getOrgsCount } from "@/services/orgs";
import { NextResponse } from "next/server";

export async function GET() {
  const eventsCountData = getEventsCount();
  const videosCountData = getVideosCount();
  const membersCountData = getUsersCount();
  const orgsCountData = getOrgsCount();

  const [eventsCount, videosCount, membersCount, orgsCount] = await Promise.all(
    [eventsCountData, videosCountData, membersCountData, orgsCountData]
  );

  return NextResponse.json({
    eventsCount: eventsCount.length > 0 ? eventsCount[0].count : 0,
    videosCount: videosCount.length > 0 ? videosCount[0].count : 0,
    membersCount: membersCount.length > 0 ? membersCount[0].count : 0,
    orgsCount: orgsCount.length > 0 ? orgsCount[0].count : 0,
  });
}
