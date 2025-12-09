"use server";
import { createSupabaseServerClient } from "@/lib/db/supabaseServer";

export async function uploadKycDetails(userId, documentType, country, images) {
  const supabase = await createSupabaseServerClient();

  let error;
  if (!images.mainDoc || !images.selfieDoc) {
    error = "Add the required documents.";
    return { success: false, error };
  }
  if (!documentType) {
    error = "Select a document type.";
    return { success: false, error };
  }
  if (!country) {
    error = "Select a country.";
    return { success: false, error };
  }


  const docId = `document/${userId}-${Date.now()}-${images.mainDoc.name}`;
  const selfieId = `selfie/${userId}-${Date.now()}-${images.selfieDoc.name}`;

  const { error: docError } = await supabase.storage
    .from("kyc")
    .upload(docId, images.mainDoc);

  if (docError) throw docError;

  const { error: selfieError } = await supabase.storage
    .from("kyc")
    .upload(selfieId, images.selfieDoc);

  if (selfieError) throw selfieError;

  const { data: docPublic } = supabase.storage.from("kyc").getPublicUrl(docId);
  const { data: selfiePublic } = supabase.storage
    .from("kyc")
    .getPublicUrl(selfieId);

  const { data: rpcResult, error: rpcError } = await supabase.rpc(
    "submit_kyc_rpc",
    {
      p_user_id: userId,
      p_document_type: documentType,
      p_country: country,
      p_document_url: docPublic.publicUrl,
      p_document_id: docId,
      p_selfie_url: selfiePublic.publicUrl,
      p_selfie_id: selfieId,
    }
  );

  if (rpcError) throw rpcError;
  return rpcResult;
}

// "use server";
// import { createSupabaseServerClient } from "@/lib/db/supabaseServer";
// import { revalidatePath } from "next/cache";

// export async function uploadKycDetails(
//   userId,
//   documentType,
//   country,
//   images,
//   prevState,
//   formData
// ) {
//   const supabase = await createSupabaseServerClient();
//   let errors = {};

//   const docImageSize = images.mainDoc.size || "";
//   const selfieImageSize = images.selfieDoc.size || "";

//   console.log("details", userId, documentType, country, images);
//   console.log("sizes", docImageSize, selfieImageSize);

//   if (!docImageSize || !selfieImageSize) {
//     errors.docError = "Add the required documents.";
//   }

//   if (!documentType) {
//     errors.docTypeError = "Go back and select a document type.";
//   }

//   if (!country) {
//     errors.countryError = "Go back and add your Country.";
//   }

//   const { data: userProfile, error: userProfileError } = await supabase
//     .from("user_profile")
//     .select("kyc_status")
//     .eq("user_id", userId)
//     .single();

//   if (userProfileError) throw userProfileError;

//   if (userProfile.kyc_status !== "not verified") {
//     errors.alreadySubmitted = "You have already submitted a KYC request.";
//   }

//   if (Object.keys(errors).length > 0) {
//     return { errors };
//   }

//   const docId = `document/${userId}-${Date.now()}-${images.mainDoc.name}`;
//   const selfieId = `selfie/${userId}-${Date.now()}-${images.selfieDoc.name}`;

//   // Upload document
//   const { data: docUpload, error: docError } = await supabase.storage
//     .from("kyc")
//     .upload(docId, images.mainDoc, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   if (docError) throw docError;

//   // Upload selfie
//   const { data: selfieUpload, error: selfieError } = await supabase.storage
//     .from("kyc")
//     .upload(selfieId, images.selfieDoc, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   if (selfieError) throw selfieError;

//   const {
//     data: { publicUrl: documentUrl },
//   } = supabase.storage.from("kyc").getPublicUrl(docId);

//   const {
//     data: { publicUrl: selfieUrl },
//   } = supabase.storage.from("kyc").getPublicUrl(selfieId);

//   console.log("serverUrl", documentUrl, selfieUrl);

//   const { data, error: uploadError } = await supabase
//     .from("kyc")
//     .insert({
//       user_id: userId,
//       document_type: documentType,
//       country: country,
//       document_image_url: documentUrl,
//       document_image_id: docId,
//       selfie_image_url: selfieUrl,
//       selfie_image_id: selfieId,
//     })
//     .select();
//   if (uploadError) throw uploadError;

//   const { data: updateUser, error: updateUserError } = await supabase
//     .from("user_profile")
//     .update({ kyc_status: "pending" })
//     .eq("user_id", userId);

//   if (updateUserError) throw updateUserError;

//   revalidatePath("/");

//   return { success: true };
// }
