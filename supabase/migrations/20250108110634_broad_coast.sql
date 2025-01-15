-- Create function to get OpenAI key
CREATE OR REPLACE FUNCTION get_openai_key()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN jsonb_build_object(
    'publicKey', current_setting('app.openai_key')
  );
END;
$$;

-- Grant access to authenticated users
GRANT EXECUTE ON FUNCTION get_openai_key() TO authenticated;