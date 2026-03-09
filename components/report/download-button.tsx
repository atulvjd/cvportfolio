'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';

interface DownloadButtonProps {
  auditId: string;
  className?: string;
}

export function DownloadButton({ auditId, className }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);

    try {
      const response = await fetch(`/api/report/${auditId}/download`);
      
      const data = await response.json();
      
      if (!response.ok || !data.downloadUrl) {
        throw new Error(data.error || 'Failed to generate PDF report.');
      }

      // Open in a new tab for download or trigger current tab download
      const a = document.createElement('a');
      a.href = data.downloadUrl;
      a.download = `WebsiteScope-Audit-${auditId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      toast.success('Report generated successfully!');
    } catch (error: any) {
      console.error('Download Error:', error);
      toast.error(error.message || 'Failed to generate PDF report. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button 
      onClick={handleDownload} 
      disabled={isDownloading}
      className={className}
    >
      {isDownloading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Preparing PDF...
        </>
      ) : (
        <>
          <FileText className="mr-2 h-4 w-4" />
          Download Full PDF Report
        </>
      )}
    </Button>
  );
}
