"use client";

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mic, Square, AlertCircle, Loader2, Search, ListChecks } from 'lucide-react';
import { voiceQueryToRecipeNames } from '@/ai/flows/voice-search-recipe';
import { useToast } from '@/hooks/use-toast';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onRecipeSelect?: (recipeName: string) => void; 
}

export default function VoiceSearchModal({ isOpen, onOpenChange, onRecipeSelect }: VoiceSearchModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedRecipes, setSuggestedRecipes] = useState<string[] | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!isOpen) {
      setIsRecording(false);
      setAudioDataUri(null);
      setIsLoading(false);
      setError(null);
      setSuggestedRecipes(null);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    }
  }, [isOpen]);

  const startRecording = async () => {
    setError(null);
    setSuggestedRecipes(null);
    setAudioDataUri(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          const reader = new FileReader();
          reader.onloadend = () => {
            setAudioDataUri(reader.result as string);
          };
          reader.readAsDataURL(audioBlob);
          stream.getTracks().forEach(track => track.stop());
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Could not access microphone. Please check permissions and ensure your browser supports audio/webm recording.");
        toast({
          variant: "destructive",
          title: "Microphone Error",
          description: "Could not access microphone. Please ensure permissions are granted and your browser supports audio/webm.",
        });
      }
    } else {
      setError("Voice recording is not supported by your browser.");
       toast({
          variant: "destructive",
          title: "Unsupported Feature",
          description: "Voice recording is not supported by your browser.",
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSearch = async () => {
    if (!audioDataUri) {
      setError("No audio recorded.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setSuggestedRecipes(null);
    try {
      const result = await voiceQueryToRecipeNames({ voiceQueryDataUri: audioDataUri });
      setSuggestedRecipes(result.recipes);
      if (result.recipes.length === 0) {
        toast({ title: "No Recipes Found", description: "The AI couldn't find recipes for your query." });
      }
    } catch (err) {
      console.error("Error in voice search:", err);
      setError("Failed to find recipes. Please try again.");
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
    onOpenChange(false); 
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle className="font-headline flex items-center">
            <Mic className="mr-2 text-primary" /> Search by Voice
          </DialogTitle>
          <DialogDescription>
            {isRecording ? "Recording your voice..." : "Press the record button and say what recipe you're looking for."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="flex justify-center">
            {!isRecording ? (
              <Button onClick={startRecording} variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10">
                <Mic className="mr-2" /> Start Recording
              </Button>
            ) : (
              <Button onClick={stopRecording} variant="destructive" size="lg">
                <Square className="mr-2" /> Stop Recording
              </Button>
            )}
          </div>

          {audioDataUri && !isRecording && (
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Audio recorded. Ready to search?</p>
              <audio controls src={audioDataUri} className="w-full" />
              <Button onClick={handleSearch} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="mr-2 h-4 w-4" />}
                Find Recipes
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
              <p className="text-muted-foreground">Searching for recipes...</p>
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
            <p className="text-center text-muted-foreground mt-4">No specific recipes found for your query. Try again or use a different search method.</p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
