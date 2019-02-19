delete from slides
where project_id = $1;

delete from projects
where id = $1;