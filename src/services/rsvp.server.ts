import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
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

type WaitUntil = (promise: Promise<unknown>) => void;

/**
 * Lets slow side work (the Zalo notification) finish after the response is sent, so the
 * guest isn't kept waiting on it. On Cloudflare, nitro exposes the worker's waitUntil on the
 * request. Returns false when that isn't available (e.g. local dev) so the caller awaits instead.
 */
function runAfterResponse(task: Promise<unknown>): boolean {
  try {
    const req = getRequest() as Request & {
      waitUntil?: WaitUntil;
      runtime?: { cloudflare?: { context?: { waitUntil?: WaitUntil } } };
    };
    const cfContext = req.runtime?.cloudflare?.context;
    const waitUntil = req.waitUntil ?? cfContext?.waitUntil?.bind(cfContext);
    if (typeof waitUntil !== "function") return false;
    waitUntil(task);
    return true;
  } catch {
    return false;
  }
}

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

    const notification = sendZaloRsvpNotification({
      name: data.name,
      attendance: data.attendance,
      guestCount: data.guestCount,
      side: data.side,
      note: data.note || null,
      createdAt,
    }).catch((botErr) => {
      console.warn("Zalo Bot notification error:", botErr);
    });
    // Respond as soon as the RSVP is saved; the Zalo message goes out in the background.
    if (!runAfterResponse(notification)) await notification;

    return { success: !error, createdAt };
  });
