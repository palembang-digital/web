import { cn } from '@/packages/lib/utils';

export function TypographyH1({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className
      )}
    >
      {children}
    </h1>
  );
}

export function TypographyP({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}>
      {children}
    </p>
  );
}

export function TypographyLead({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn('text-xl text-muted-foreground', className)}>{children}</p>
  );
}
