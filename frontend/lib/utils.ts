import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (username: string) => {
  if (!username) return 'U';
  
  // Divide el username en partes y toma la primera letra de cada una
  const parts = username.split(/[ _-]/);
  let initials = '';
  
  // Toma hasta 2 iniciales (primera letra del nombre y primera del apellido si existe)
  for (let i = 0; i < Math.min(parts.length, 2); i++) {
    if (parts[i] && parts[i][0]) {
      initials += parts[i][0].toUpperCase();
    }
  }
  
  return initials || 'U';
};