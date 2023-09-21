CREATE TABLE contacts (
	id INTEGER PRIMARY KEY,
	period_end TEXT NOT NULL,
	client_id TEXT NOT NULL,
	attributed_customers INTEGER,
	unattributed_customers INTEGER,
    contribution_rate REAL
);