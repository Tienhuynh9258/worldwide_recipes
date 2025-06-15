import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: 'default' | 'card' | 'text' | 'circle' | 'recipe';
  count?: number;
}

function LoadingSkeleton({ className, variant = 'default', count = 1 }: LoadingSkeletonProps) {
  const skeletons = Array.from({ length: count }, (_, i) => i);

  const renderSkeleton = (index: number) => {
    switch (variant) {
      case 'recipe':
        return (
          <div 
            key={index} 
            className={cn(
              "bg-card p-4 rounded-2xl shadow-spice h-[450px] border-2 border-spice-orange/20 animate-pulse hover-glow transition-all duration-300",
              `stagger-${(index % 6) + 1}`,
              className
            )}
          >
            <div className="w-full h-60 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg mb-4 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1}s`}}></div>
              <div className="absolute top-3 left-3 flex gap-2">
                <div className="w-20 h-6 bg-herb-green/30 rounded-full animate-pulse"></div>
                <div className="w-16 h-6 bg-tomato-red/30 rounded-full animate-pulse"></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="w-3/4 h-8 bg-gradient-to-r from-muted via-muted/50 to-muted rounded mb-3 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1 + 0.2}s`}}></div>
              </div>
              <div className="w-full h-5 bg-gradient-to-r from-muted via-muted/50 to-muted rounded mb-2 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1 + 0.3}s`}}></div>
              </div>
              <div className="w-5/6 h-5 bg-gradient-to-r from-muted via-muted/50 to-muted rounded mb-4 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1 + 0.4}s`}}></div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border/20">
                <div className="w-24 h-7 bg-gradient-to-r from-spice-orange/30 to-tomato-red/30 rounded-full animate-pulse relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1 + 0.5}s`}}></div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-herb-green/40 rounded animate-pulse"></div>
                  <div className="w-16 h-5 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1 + 0.6}s`}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'card':
        return (
          <div 
            key={index} 
            className={cn(
              "bg-card p-6 rounded-xl shadow-lg animate-pulse hover-glow transition-all duration-300",
              `stagger-${(index % 4) + 1}`,
              className
            )}
          >
            <div className="w-full h-40 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1}s`}}></div>
            </div>
            <div className="w-3/4 h-6 bg-gradient-to-r from-muted via-muted/50 to-muted rounded mb-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1 + 0.2}s`}}></div>
            </div>
            <div className="w-full h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1 + 0.3}s`}}></div>
            </div>
          </div>
        );
      
      case 'text':
        return (
          <div 
            key={index} 
            className={cn(
              "w-full h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse relative overflow-hidden",
              `stagger-${(index % 3) + 1}`,
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1}s`}}></div>
          </div>
        );
      
      case 'circle':
        return (
          <div 
            key={index} 
            className={cn(
              "w-12 h-12 bg-gradient-to-r from-muted via-muted/50 to-muted rounded-full animate-pulse relative overflow-hidden",
              `stagger-${(index % 3) + 1}`,
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1}s`}}></div>
          </div>
        );
      
      default:
        return (
          <div 
            key={index} 
            className={cn(
              "w-full h-4 bg-gradient-to-r from-muted via-muted/50 to-muted rounded animate-pulse relative overflow-hidden",
              `stagger-${(index % 3) + 1}`,
              className
            )}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" style={{animationDelay: `${index * 0.1}s`}}></div>
          </div>
        );
    }
  };

  return (
    <>
      {skeletons.map(renderSkeleton)}
    </>
  );
}

export { LoadingSkeleton }; 