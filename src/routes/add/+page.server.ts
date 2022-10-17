import { supabase } from "$lib/supabaseClient";

import { error, invalid, redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "../$types";
import * as yup from "yup";

export const actions: Actions = {
  addData: async ({ request }) => {
    const formData = await request.formData();

    const msisdn = formData.get("msisdn");
    const shortcode = formData.get("shortcode");
    const keyword = formData.get("keyword");
    const status = formData.get("status");
    const charge_price = formData.get("charge_price");
    const service = formData.get("service");

    const validateValue = {
      msisdn,
      shortcode,
      keyword,
      status,
      charge_price,
      service,
    };

    const schema = yup.object().shape({
      msisdn: yup
        .number()
        .typeError("Msisdn should be a number")
        .required("Msisdn is required")
        .positive()
        .integer(),
      shortcode: yup.string().required("Shortcode is required"),
      keyword: yup.string().required("Keyword is required"),
      status: yup.string().required("Status is required"),
      service: yup.string().required("Service is required"),
      charge_price: yup.number().typeError('Charge price need to be in decimal').required("Charge Price is required").round()
    });

    const isValid = await schema.isValid(validateValue);
    let errors = {};
    let test = []

    const addErrorMessage = (message) => {
      test.push(message)
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
        message: test,
        msisdn,
        keyword,
        status,
        service,
        charge_price,
      });
    }

    const { data: subscription, error: errorMessage } = await supabase
      .from("Subscription")
      .insert({
        msisdn: msisdn,
        shortcode: shortcode,
        keyword: keyword,
        status: status,
        charge_price: charge_price,
        service: service,
      });
    throw redirect(303, "/");
    return {
      success: true,
      subscription,
    };
  },
};
