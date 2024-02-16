"use server";

import { action } from "@/actions/safe-action";
import { deleteProjectSchema } from "@/actions/schema";
import { LogEvents } from "@midday/events/events";
import { logsnag } from "@midday/events/server";
import { getUser } from "@midday/supabase/cached-queries";
import { createClient } from "@midday/supabase/server";
import { revalidateTag } from "next/cache";

export const deleteProjectAction = action(
  deleteProjectSchema,
  async (params) => {
    const supabase = createClient();
    const user = await getUser();

    await supabase.from("tracker_projects").delete().eq("id", params.id);

    revalidateTag(`tracker_projects_${user.data.team_id}`);

    logsnag.track({
      event: LogEvents.ProjectDeleted.name,
      icon: LogEvents.ProjectDeleted.icon,
      user_id: user.data.email,
      channel: LogEvents.ProjectDeleted.channel,
    });
  }
);
