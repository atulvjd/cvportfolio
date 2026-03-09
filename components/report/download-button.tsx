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
      
      if (!response.ok) {
        throw new Error('Failed to download PDF report.');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `WebsiteScope-Audit-${auditId}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast.success('Report downloaded successfully!');
    } catch (error) {
      console.error('Download Error:', error);
      toast.error('Failed to generate PDF report. Please try again.');
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
