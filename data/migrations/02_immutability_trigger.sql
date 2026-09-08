-- 02_immutability_trigger.sql
-- This migration enforces immutability for observations that are verified.
-- It prevents changing core fields: value, metric_id, source_url, period_end
-- A corrected observation must be inserted as a new row.

CREATE OR REPLACE FUNCTION check_observation_immutability()
RETURNS TRIGGER AS $$
BEGIN
    -- Only enforce if the existing row is verified
    IF OLD.verification_status = 'verified' THEN
        -- Check if any of the core fields are being modified
        IF NEW.value IS DISTINCT FROM OLD.value OR
           NEW.metric_id IS DISTINCT FROM OLD.metric_id OR
           NEW.source_url IS DISTINCT FROM OLD.source_url OR
           NEW.period_label IS DISTINCT FROM OLD.period_label OR
           NEW.period_end IS DISTINCT FROM OLD.period_end THEN
            
            RAISE EXCEPTION 'Cannot modify core fields of a verified observation. Please insert a new observation instead.';
        END IF;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS enforce_observation_immutability ON observations;

CREATE TRIGGER enforce_observation_immutability
BEFORE UPDATE ON observations
FOR EACH ROW
EXECUTE FUNCTION check_observation_immutability();
