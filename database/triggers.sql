-- Trigger for Invoice Payment Validation
CREATE OR REPLACE FUNCTION validate_invoice_payment() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.amount_paid < (SELECT total_amount FROM invoices WHERE id = NEW.invoice_id) THEN
        RAISE EXCEPTION 'Insufficient payment for invoice %', NEW.invoice_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_invoice_payment
BEFORE INSERT OR UPDATE ON invoice_payments
FOR EACH ROW
EXECUTE FUNCTION validate_invoice_payment();

-- Trigger for Project Completion Checks
CREATE OR REPLACE FUNCTION check_project_completion() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND (SELECT COUNT(*) FROM tasks WHERE project_id = NEW.id AND status != 'completed') > 0 THEN
        RAISE EXCEPTION 'Cannot complete project %: Not all tasks are completed', NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_project_completion
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION check_project_completion();

-- Trigger for Task User Validation
CREATE OR REPLACE FUNCTION validate_task_user() RETURNS TRIGGER AS $$
BEGIN
    IF NEW.user_id IS NULL THEN
        RAISE EXCEPTION 'Task % must be assigned to a user.', NEW.id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER check_task_user
BEFORE INSERT OR UPDATE ON tasks
FOR EACH ROW
EXECUTE FUNCTION validate_task_user();

-- Trigger for Audit Enforcement
CREATE OR REPLACE FUNCTION enforce_audit() RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit_logs(table_name, record_id, action, old_data, new_data, changed_at)
    VALUES (TG_TABLE_NAME, OLD.id, TG_OP, row_to_json(OLD), row_to_json(NEW), NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER log_audit
AFTER INSERT OR UPDATE OR DELETE ON invoices, projects, tasks
FOR EACH ROW
EXECUTE FUNCTION enforce_audit();
