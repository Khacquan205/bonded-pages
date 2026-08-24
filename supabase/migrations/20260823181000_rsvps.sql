CREATE TABLE IF NOT EXISTS public.rsvps (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text,
  attendance text NOT NULL DEFAULT 'yes',
  guest_count integer NOT NULL DEFAULT 1,
  side text NOT NULL DEFAULT 'both',
  note text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT rsvps_name_len CHECK (char_length(btrim(name)) BETWEEN 1 AND 60)
);

GRANT SELECT, INSERT ON public.rsvps TO anon;
GRANT SELECT, INSERT ON public.rsvps TO authenticated;
GRANT ALL ON public.rsvps TO service_role;

ALTER TABLE public.rsvps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit rsvp"
  ON public.rsvps FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Anyone can read rsvps"
  ON public.rsvps FOR SELECT
  TO anon, authenticated
  USING (true);
