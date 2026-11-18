import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .nonempty("Name is required")
      .min(3, "Name must be at least 3 characters long")
      .max(15, "Name must be at most 15 characters long"),
    
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    
    password: z
      .string()
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[@$!%*?&]/, "Password must contain a special character")
      .nonempty("Password is required")
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password must be at most 20 characters long"),
    rePassword: z.string().nonempty("Confirm Password is required"),
    phone: z.string().nonempty("Phone is required").regex(/^(\+(?=2))?2?01(?![3-4])[0-5]{1}[0-9]{8}$/, "Invalid phone")
  })
  .refine(
    (data) => {
      return data.password === data.rePassword;
    },
    {
      message: "Passwords must match",
      path: ["rePassword"],
    },
  );

  export const loginSchema = z
  .object({    
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),    
    password: z
      .string()
      .regex(/[0-9]/, "Password must contain a number")
      .regex(/[A-Z]/, "Password must contain an uppercase letter")
      .regex(/[a-z]/, "Password must contain a lowercase letter")
      .regex(/[@$!%*?&]/, "Password must contain a special character")
      .nonempty("Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password must be at most 20 characters long"),    
  });

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Current password is required"),
    password: registerSchema.shape.password,
    rePassword: z.string().nonempty("Confirm password is required"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords must match",
    path: ["rePassword"],
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type UpdatePasswordSchemaType = z.infer<typeof updatePasswordSchema>;