export type PasswordStrength = "Weak" | "Medium" | "Strong";

export function getPasswordStrength(password: string): PasswordStrength {
    if (!password || password.length < 8) return "Weak";

    let score = 0;
    
    // Contains lowercase
    if (/[a-z]/.test(password)) score++;
    
    // Contains uppercase
    if (/[A-Z]/.test(password)) score++;
    
    // Contains number
    if (/[0-9]/.test(password)) score++;
    
    // Contains special character
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    // Extra length bonus
    if (password.length >= 12) score++;

    if (score < 3) return "Weak";
    if (score === 3 || score === 4) return "Medium";
    return "Strong";
}
