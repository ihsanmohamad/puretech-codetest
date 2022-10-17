import { supabase } from "$lib/supabaseClient";
import { error, invalid, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import * as yup from "yup";


export const load: PageServerLoad = async ({params}) => {
    
    let { id } = params

  let { data: subscription, error: errorMessage } = await supabase
    .from("Subscription")
    .select("*").eq('id', params.id);
    

  if (!subscription) {
    throw error(400, `${errorMessage?.message}`);
  }
   
  return { subscription, id};
};

export const actions: Actions = {
    editData: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get("id");
        const status = formData.get("status");
        const charge_price = formData.get("charge_price");
        const service = formData.get("service");

        const validateValue = {
            status,
            charge_price,
            service,
          };
      
          const schema = yup.object().shape({
            status: yup.string().required("Status is required"),
            service: yup.string().required("Service is required"),
            charge_price: yup.number().typeError('Charge price need to be in decimal').required("Charge Price is required").positive().min(0.00)
          });
      
          const isValid = await schema.isValid(validateValue);
          let errors = {};
          let validationMessage = []
      
          const addErrorMessage = (message) => {
            validationMessage.push(message)
          }
      
          const validateData = async () => await schema
              .validate(validateValue, { abortEarly: false })
              .then(() => {
                alert(JSON.stringify(validateValue, null, 2));
                errors = {};
              })
              .catch((err) => {
                errors = extractErrors(err);
              });
              
          function extractErrors(err) {
            return err.inner.reduce((acc, err) => {
              addErrorMessage(err.message)
              return { ...acc, [err.path]: err.message };        
            }, {});
          } 
      
      
          if (!isValid) {
            await validateData();
            
            return invalid(400, {
              error: true,
              message: validationMessage,
              status,
              service,
              charge_price,
            });
          }

          const { data: subscription, error: errorMessage } = await supabase
            .from('Subscription')
            .update({ status: status, charge_price: charge_price, service: service })
            .eq('id', id)
        
          throw redirect(303, "/");
          return {
            success: true,
            subscription,
          };
    }
}

