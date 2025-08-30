"use server";

import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  contact: z.string(),
  location: z.string(),
  work: z.string(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  // Here you would typically save the data to a database like Firebase Firestore.
  // For this example, we'll just simulate a successful submission.
  
  const parsed = formSchema.safeParse(values);

  if (!parsed.success) {
    return { success: false, message: "Invalid data provided." };
  }

  console.log("New contact form submission:", parsed.data);

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: "Form submitted successfully!" };
}
