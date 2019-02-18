select v.video_url, p.title
from videos v
join projects p on v.id = p.video_id
where p.id = $1;