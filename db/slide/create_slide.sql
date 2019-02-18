insert into slides (
    project_id,
    pause_time,
    title
) values (
    $1,
    $2,
    $3
)
returning *;