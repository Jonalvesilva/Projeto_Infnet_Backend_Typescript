export type ToastProps = {
  message?: React.ReactNode;
  className: string;
};

export function Toast({ message, className }: ToastProps) {
  return <span className={className}>{message}</span>;
}
