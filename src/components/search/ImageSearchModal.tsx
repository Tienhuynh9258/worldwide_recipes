"use client";

import { useState, useRef, ChangeEvent, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageUp, AlertCircle, Loader2, Search, ListChecks } from 'lucide-react';
import { imageSearchRecipe } from '@/ai/flows/image-search-recipe';
import { compressImageToDataUri } from '@/lib/file-utils';
import Image from 'next/image'; // next/image
import { useToast } from '@/hooks/use-toast';

interface ImageSearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRecipeSelect?: (recipeName: string) => void; // Callback to set search term on main page
}

export default function ImageSearchModal({ isOpen, onOpenChange, onRecipeSelect }: ImageSearchModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedRecipes, setSuggestedRecipes] = useState<string[] | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when modal is closed/opened
    if (!isOpen) {
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsLoading(false);
      setError(null);
      setSuggestedRecipes(null);
    }
  }, [isOpen]);


  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        setError("That image is too large (max 20MB). Please choose a smaller photo.");
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
      setSuggestedRecipes(null);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = async () => {
    if (!selectedFile) {
      setError("Please select an image file.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestedRecipes(null);
    try {
      const dataUri = await compressImageToDataUri(selectedFile);
      const result = await imageSearchRecipe({ image: dataUri });
      setSuggestedRecipes(result.recipes);
      if (result.recipes.length === 0) {
        toast({ title: "No Recipes Found", description: "The AI couldn't identify specific recipes from the image." });
      }
    } catch (err) {
      console.error("Error in image search:", err);
      setError("Failed to find recipes from the image. Please try again.");
      toast({
        variant: "destructive",
        title: "Search Failed",
        description: "An error occurred while searching for recipes.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRecipeClick = (recipeName: string) => {
    if (onRecipeSelect) {
      onRecipeSelect(recipeName);
    }
    onOpenChange(false); // Close modal after selection
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center">
            <ImageUp className="mr-2 text-primary" /> Search by Image
          </DialogTitle>
          <DialogDescription>
            Upload an image of a dish or ingredient to find related recipes.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <Input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden" 
            id="imageUploadInput"
          />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
            <ImageUp className="mr-2" /> Choose Image
          </Button>

          {previewUrl && (
            <div className="mt-4 border rounded-lg p-2 bg-muted/30 flex flex-col items-center">
              <Image src={previewUrl} alt="Selected preview" width={200} height={200} className="rounded-md object-cover max-h-[200px]" data-ai-hint="food photo" />
            </div>
          )}

          {selectedFile && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Selected: {selectedFile.name}</p>
              <Button onClick={handleSearch} disabled={isLoading} className="w-full mt-2">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Find Recipes from Image
              </Button>
            </div>
          )}
          
          {error && (
            <div className="flex items-center p-3 rounded-md bg-destructive/10 text-destructive">
              <AlertCircle className="mr-2" size={20} />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-6 space-y-2">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-muted-foreground">Analyzing image and finding recipes...</p>
            </div>
          )}

          {suggestedRecipes && suggestedRecipes.length > 0 && (
            <div className="mt-4 p-4 border rounded-lg bg-secondary/50">
              <h3 className="text-lg font-semibold text-primary mb-2 flex items-center">
                <ListChecks size={20} className="mr-2"/> Suggested Recipes:
              </h3>
              <ul className="space-y-1">
                {suggestedRecipes.map((recipeName, index) => (
                  <li key={index}>
                    <Button 
                      variant="link" 
                      className="p-0 h-auto text-left text-foreground hover:text-primary"
                      onClick={() => handleRecipeClick(recipeName)}
                    >
                      {recipeName}
                    </Button>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground mt-2">Click a recipe name to search for it.</p>
            </div>
          )}
           {suggestedRecipes && suggestedRecipes.length === 0 && !isLoading && (
            <p className="text-center text-muted-foreground mt-4">No specific recipes found for this image. Try a different image or search method.</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
