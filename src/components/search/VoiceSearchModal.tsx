"use client";

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Mic, Square, AlertCircle, Loader2, CookingPot } from 'lucide-react';
import { voiceSearchRecipe } from '@/ai/flows/voice-search-recipe';
import type { AiGeneratedRecipe } from '@/types';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface VoiceSearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function VoiceSearchModal({ isOpen, onOpenChange }: VoiceSearchModalProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioDataUri, setAudioDataUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recipeResult, setRecipeResult] = useState<AiGeneratedRecipe | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Reset state when modal is closed/opened
    if (!isOpen) {
      setIsRecording(false);
      setAudioDataUri(null);
      setIsLoading(false);
      setError(null);
      setRecipeResult(null);
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
        mediaRecorderRef.current.stop();
      }
    }
  }, [isOpen]);

  const startRecording = async () => {
    setError(null);
    setRecipeResult(null);
    setAudioDataUri(null);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
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
          stream.getTracks().forEach(track => track.stop()); // Stop microphone access
        };

        mediaRecorderRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Could not access microphone. Please check permissions.");
        toast({
          variant: "destructive",
          title: "Microphone Error",
          description: "Could not access microphone. Please ensure permissions are granted.",
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
    setRecipeResult(null);
    try {
      const result = await voiceSearchRecipe({ voiceQueryDataUri: audioDataUri });
      setRecipeResult(result);
    } catch (err) {
      console.error("Error in voice search:", err);
      setError("Failed to find a recipe. Please try again.");
      toast({
          variant: "destructive",
          title: "Search Failed",
          description: "An error occurred while searching for the recipe.",
        });
    } finally {
      setIsLoading(false);
    }
  };

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
                Find Recipe
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
              <p className="text-muted-foreground">Searching for your recipe...</p>
            </div>
          )}

          {recipeResult && (
            <div className="mt-4 p-4 border rounded-lg bg-secondary/50">
              <h3 className="text-xl font-headline text-primary mb-2 flex items-center">
                <CookingPot size={20} className="mr-2"/> {recipeResult.recipeName}
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-md">Ingredients:</h4>
                  <ul className="list-disc list-inside text-sm text-muted-foreground ml-4">
                    {recipeResult.ingredients.map((ing, index) => (
                      <li key={index}>{ing}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-md">Instructions:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{recipeResult.instructions}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
