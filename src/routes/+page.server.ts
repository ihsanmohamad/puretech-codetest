import { supabase } from "$lib/supabaseClient";
import { error } from "@sveltejs/kit";
import { tablesData } from '$lib/stores/tableData'
import type {  PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  let { data: subscription, error: errorMessage } = await supabase
    .from("Subscription")
    .select("*");
    
  if (!subscription) {
    throw error(400, `${errorMessage?.message}`);
  }
   tablesData.update(subscription)
  return { subscription };
};

