CREATE TABLE public.guestbook_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  message text NOT NULL,
  side text NOT NULL DEFAULT 'both',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT guestbook_name_len CHECK (char_length(btrim(name)) BETWEEN 1 AND 60),
  CONSTRAINT guestbook_message_len CHECK (char_length(btrim(message)) BETWEEN 1 AND 500),
  CONSTRAINT guestbook_side_valid CHECK (side IN ('bride', 'groom', 'both'))
);

GRANT SELECT, INSERT ON public.guestbook_messages TO anon;
GRANT SELECT, INSERT ON public.guestbook_messages TO authenticated;
GRANT ALL ON public.guestbook_messages TO service_role;

ALTER TABLE public.guestbook_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read guestbook messages"
  ON public.guestbook_messages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can leave a guestbook message"
  ON public.guestbook_messages FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE INDEX guestbook_messages_created_at_idx ON public.guestbook_messages (created_at DESC);

INSERT INTO public.guestbook_messages (name, message, side) VALUES
  ('Gia đình bác Hoà', 'Chúc hai cháu trăm năm hạnh phúc, đầu bạc răng long!', 'bride'),
  ('Thu Hà', 'Cuối cùng cũng tới ngày này. Yêu hai đứa nhiều lắm nha!', 'bride'),
  ('Đức Anh', 'Chúc mừng ông bạn già. Hẹn gặp ở White Palace!', 'groom');