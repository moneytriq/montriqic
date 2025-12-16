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

