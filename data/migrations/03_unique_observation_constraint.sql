-- Add unique constraint to prevent race conditions during concurrent ingests
ALTER TABLE observations ADD CONSTRAINT unique_metric_period_value UNIQUE (metric_id, period_label, value);
