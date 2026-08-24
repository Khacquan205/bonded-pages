-- Stores the zalo-notify-bot's login session (cookie/imei/userAgent) so it
-- survives restarts on hosts without a persistent disk (e.g. Render free tier).
-- No anon/authenticated grants on purpose: only the service role (used by the
-- bot with SUPABASE_SERVICE_ROLE_KEY) may read or write this table, since the
-- session data is equivalent to a Zalo login credential.
CREATE TABLE IF NOT EXISTS public.bot_sessions (
  id text NOT NULL PRIMARY KEY,
  credentials jsonb NOT NULL,
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT ALL ON public.bot_sessions TO service_role;

ALTER TABLE public.bot_sessions ENABLE ROW LEVEL SECURITY;
-- No policies added: RLS enabled with zero policies denies all access to
-- anon/authenticated roles by default, while service_role bypasses RLS entirely.
