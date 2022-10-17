import { supabase } from "$lib/supabaseClient";
import { error } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  let { data: subscription, error: errorMessage } = await supabase
    .from("Subscription")
    .select("*");
    
  if (!subscription) {
    throw error(400, `${errorMessage}`);
  }

  return { subscription };
};

