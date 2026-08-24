import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { sendZaloRsvpNotification } from "@/services/notification.server";

const rsvpInputSchema = z.object({
  name: z.string().trim().min(1).max(60),
  attendance: z.enum(["yes", "no"]),
  guestCount: z.number().int().min(0).max(20),
  side: z.enum(["both", "bride", "groom"]),
  note: z.string().trim().max(150).nullable().optional(),
});

export const submitRsvp = createServerFn({ method: "POST" })
  .validator((data: unknown) => rsvpInputSchema.parse(data))
  .handler(async ({ data }) => {
    const createdAt = new Date().toISOString();

    const { error } = await supabaseAdmin.from("rsvps").insert([
      {
        name: data.name,
        attendance: data.attendance,
        guest_count: data.guestCount,
        side: data.side,
        note: data.note || null,
        created_at: createdAt,
      },
    ]);

    if (error) {
      console.error("Supabase RSVP insert error:", error.message);
    }

    try {
      await sendZaloRsvpNotification({
        name: data.name,
        attendance: data.attendance,
        guestCount: data.guestCount,
        side: data.side,
        note: data.note || null,
        createdAt,
      });
    } catch (botErr) {
      console.warn("Zalo Bot notification error:", botErr);
    }

    return { success: !error, createdAt };
  });
