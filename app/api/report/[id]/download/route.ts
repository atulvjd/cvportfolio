import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/db';
import { generatePDFBuffer } from '@/services/report-generator';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // 1. Fetch audit data from database
    const { data: audit, error: fetchError } = await supabaseAdmin
      .from('audits')
      .select(`
        *,
        audit_results (
          performance_score,
          seo_score,
          accessibility_score,
          ux_score,
          mobile_score,
          ai_report,
          created_at
        )
      `)
      .eq('id', id)
      .single();

    if (fetchError || !audit) {
      return NextResponse.json({ error: 'Audit not found' }, { status: 404 });
    }

    const results = audit.audit_results?.[0];
    if (!results) {
      return NextResponse.json({ error: 'Audit results not found' }, { status: 404 });
    }

    // 2. Generate PDF buffer
    const pdfBuffer = await generatePDFBuffer(audit, results);

    // 3. (Optional) Upload to Storage for long-term access
    // We'll do this in the background or await it if we want to ensure storage sync
    try {
      const { uploadPDFToStorage } = await import('@/services/report-generator');
      await uploadPDFToStorage(id, pdfBuffer);
    } catch (storageError) {
      console.error('Storage Upload Error (Continuing anyway):', storageError);
    }

    // 4. Return the PDF directly as a stream/buffer
    return new Response(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="WebsiteScope-Audit-${id}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error('PDF Download API Error:', error);
    return NextResponse.json({ error: error.message || 'Failed to generate PDF' }, { status: 500 });
  }
}
