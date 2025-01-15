import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { DocumentService } from '@/lib/services/document.service';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadButtonProps {
  onDataExtracted: (data: any) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function DocumentUploadButton({ 
  onDataExtracted, 
  isLoading,
  setIsLoading 
}: DocumentUploadButtonProps) {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      setFile(selectedFile);
      setProgress(0);
      
      const data = await DocumentService.processTenantDocument(selectedFile, (progress) => {
        setProgress(progress);
      });
      
      onDataExtracted(data);
      
      toast({
        title: "Document Processed",
        description: "Tenant information extracted successfully.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Processing Error",
        description: error.message || "Failed to process document",
      });
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="hidden"
          id="tenant-document-upload"
          disabled={isLoading}
        />
        <label htmlFor="tenant-document-upload">
          <Button
            variant="outline"
            className="cursor-pointer"
            disabled={isLoading}
            asChild
          >
            <div className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              {isLoading ? "Processing..." : "Upload Document"}
            </div>
          </Button>
        </label>
      </div>
      
      {isLoading && (
        <div className="space-y-2">
          <Progress value={progress} />
          <p className="text-sm text-kingdom-text/70">
            {progress < 100 ? "Processing document..." : "Finalizing..."}
          </p>
        </div>
      )}
    </div>
  );
}