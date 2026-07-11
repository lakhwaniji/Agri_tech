-- Run this AFTER 003_ops_users.sql. Replace the username/password/name
-- below with whatever the ops team should actually log in with.
insert into public.ops_users (username, password, full_name, role)
values ('admin', 'changeme123', 'Love Lakhwani', 'admin');

-- To add more team members later, run another insert here.
