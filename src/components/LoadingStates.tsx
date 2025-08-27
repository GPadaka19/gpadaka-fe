import { motion } from 'framer-motion';

export function SkeletonCard() {
  return (
    <div className="bg-muted rounded-lg p-6 animate-pulse">
      <div className="h-4 bg-muted-foreground/20 rounded mb-3"></div>
      <div className="h-3 bg-muted-foreground/20 rounded mb-2"></div>
      <div className="h-3 bg-muted-foreground/20 rounded w-3/4"></div>
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-32 h-32 bg-muted rounded-full mx-auto mb-6"
        />
        <div className="h-8 bg-muted rounded mb-4 w-64 mx-auto"></div>
        <div className="h-6 bg-muted rounded mb-2 w-96 mx-auto"></div>
        <div className="h-6 bg-muted rounded w-80 mx-auto"></div>
      </div>
    </div>
  );
}

export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex justify-center items-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-muted-foreground/20 border-t-primary rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center"
        >
          <span className="text-primary-foreground text-2xl font-bold">G</span>
        </motion.div>
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-muted-foreground"
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
}

export function SectionLoader() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
