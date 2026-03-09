import React from 'react';
import { renderToBuffer } from '@react-pdf/renderer';
import { AuditPDFDocument } from '@/components/report/pdf/pdf-document';
import { supabaseAdmin } from '@/lib/db';

/**
 * Generates a PDF buffer for a given audit.
 */
export async function generatePDFBuffer(audit: any, results: any) {
  try {
    const buffer = await renderToBuffer(
      React.createElement(AuditPDFDocument, { audit, results })
    );
    return buffer;
  } catch (error) {
    console.error('PDF Generation Error:', error);
    throw error;
  }
}

/**
 * Uploads a PDF buffer to Supabase Storage.
 */
export async function uploadPDFToStorage(auditId: string, buffer: Buffer) {
  try {
    const fileName = `audit-${auditId}.pdf`;
    
    // Upload the file to 'audit-reports' bucket
    const { data, error } = await supabaseAdmin.storage
      .from('audit-reports')
      .upload(fileName, buffer, {
        contentType: 'application/pdf',
        upsert: true,
      });

    if (error) throw error;

    // Get the signed URL for the file (valid for 1 hour)
    const { data: signedUrlData, error: signedUrlError } = await supabaseAdmin.storage
      .from('audit-reports')
      .createSignedUrl(fileName, 3600); // 1 hour

    if (signedUrlError) throw signedUrlError;

    return signedUrlData.signedUrl;
  } catch (error) {
    console.error('Storage Upload Error:', error);
    throw error;
  }
}
