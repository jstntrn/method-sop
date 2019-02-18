select s.id, s.pause_time, s.title
from slides s
join projects p on s.project_id = p.id
where s.project_id = $1;