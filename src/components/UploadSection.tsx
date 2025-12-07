import { useState, useCallback } from "react";
import { Upload, FileImage, X, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadSectionProps {
  onAnalyze: (file: File) => void;
  isAnalyzing: boolean;
}

const UploadSection = ({ onAnalyze, isAnalyzing }: UploadSectionProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type.startsWith("image/") || droppedFile.type === "application/pdf")) {
      setFile(droppedFile);
      if (droppedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(droppedFile);
      } else {
        setPreview(null);
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(selectedFile);
      } else {
        setPreview(null);
      }
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
  };

  const handleAnalyze = () => {
    if (file) {
      onAnalyze(file);
    }
  };

  return (
    <section id="upload" className="py-20 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-sora font-bold text-3xl md:text-5xl mb-4">
            Verify Your <span className="gradient-text">Certificate</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Drop your certificate below and our AI will analyze it in seconds.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
              relative glass-card p-8 md:p-12 rounded-3xl border-2 border-dashed transition-all duration-300
              ${isDragging ? "border-primary bg-primary/5 scale-[1.02]" : "border-border hover:border-primary/50"}
              ${file ? "border-solid border-primary/30" : ""}
            `}
          >
            {!file ? (
              <label className="cursor-pointer block">
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="text-center">
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <Upload className="w-10 h-10 text-primary" />
                    </div>
                    <div className="absolute -inset-2 bg-primary/20 rounded-3xl blur-xl opacity-50" />
                  </div>
                  <h3 className="font-sora font-semibold text-xl mb-2">
                    Drag & Drop your certificate
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    or click to browse files
                  </p>
                  <p className="text-sm text-muted-foreground/60">
                    Supports: JPG, PNG, PDF (Max 10MB)
                  </p>
                </div>
              </label>
            ) : (
              <div className="animate-scale-in">
                <div className="flex items-start gap-4">
                  {preview ? (
                    <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-border flex-shrink-0">
                      <img
                        src={preview}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                      <FileImage className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h4 className="font-semibold truncate">{file.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                        <div className="flex items-center gap-2 mt-2 text-success">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-sm">Ready for analysis</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={removeFile}
                        disabled={isAnalyzing}
                        className="flex-shrink-0"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <Button
                    variant="hero"
                    size="lg"
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="min-w-[200px]"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Certificate"
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Secure Upload
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              Private Analysis
            </span>
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              No Data Stored
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadSection;
